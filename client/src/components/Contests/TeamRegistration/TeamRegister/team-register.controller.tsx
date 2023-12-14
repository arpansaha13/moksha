import { startTransition, useMemo, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useSet } from '~/hooks/common/useSet'
import { useFetch } from '~/hooks/common/useFetch'
import type { TeamContest, User } from '~/types'
import type { TeamRegisterProps } from './team-register.types'

export function useTeamRegisterController({
  contest,
  team,
  members,
  alreadyRegisteredMemberIds,
  setRegistration,
}: TeamRegisterProps) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const [error, showError] = useState(false)
  const { add, delete: del, has, size: selectedCount, toArray } = useSet<string>([])

  const minMembersRequired = getMinMembersRequiredCount(contest.allowedTeamSize)
  const hasAlreadyRegisteredMembers = alreadyRegisteredMemberIds.size > 0

  const { filteredMembers, alreadyRegisteredMembers } = useMemo(
    () => filterMembers(members, alreadyRegisteredMemberIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  function teamRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (error) return

    if (!isTeamSizeValid(contest.allowedTeamSize, selectedCount)) {
      showError(true)
      setTimeout(() => showError(false), 500)
      return
    }
    setLoading(true)

    fetchHook('contests/team/registration', {
      method: 'POST',
      body: {
        team_id: team.team_id,
        contest_id: contest.id,
        selected_members: toArray(),
      },
    })
      .then(res =>
        startTransition(() => {
          setRegistration(res.data)
          setLoading(false)
        })
      )
      .catch(() => setLoading(false))
  }

  return {
    error,
    loading,
    selectedCount,
    filteredMembers,
    minMembersRequired,
    hasAlreadyRegisteredMembers,
    alreadyRegisteredMembers,
    add,
    del,
    has,
    teamRegister,
  }
}

function getMinMembersRequiredCount(sizes: TeamContest['allowedTeamSize']) {
  let minMembersRequired = 0

  if (Array.isArray(sizes)) {
    minMembersRequired = sizes[0]
  } else if (typeof sizes === 'number') {
    minMembersRequired = sizes
  } else {
    minMembersRequired = sizes.min
  }

  return minMembersRequired
}

function isTeamSizeValid(sizes: TeamContest['allowedTeamSize'], selectedCount: number) {
  if (Array.isArray(sizes)) return sizes.includes(selectedCount)

  if (typeof sizes === 'number') return sizes === selectedCount

  if (isNullOrUndefined(sizes.max)) return sizes.min <= selectedCount

  return sizes.min <= selectedCount && selectedCount <= sizes.max
}

function filterMembers(members: User[], alreadyRegisteredMemberIds: Set<string>) {
  const filteredMembers = []
  const alreadyRegisteredMembers = []

  for (const member of members) {
    if (alreadyRegisteredMemberIds.has(member.user_id)) alreadyRegisteredMembers.push(member)
    else filteredMembers.push(member)
  }

  return { filteredMembers, alreadyRegisteredMembers }
}