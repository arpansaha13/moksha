import { useEffect, useState, startTransition } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useFetch } from '~/hooks/common/useFetch'
import type { User } from '~/types'
import type { TeamRegistrationProps } from './team-registration.types'

export function useTeamRegistrationController({ contest }: TeamRegistrationProps) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(true)
  const [createdTeam, setCreatedTeam] = useState(null)
  const [teamMembers, setTeamMembers] = useState<User[]>([])
  const [alreadyRegisteredMemberIds, setAlreadyRegisteredMemberIds] = useState<Set<string>>(new Set([]))
  const [registration, setRegistration] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const team = await fetchCreatedTeam(fetchHook)

      if (isNullOrUndefined(team)) return
      setCreatedTeam(team)

      const registration = await fetchRegistration(fetchHook, team.team_id, contest.id)

      if (!isNullOrUndefined(registration)) {
        setRegistration(registration)
      } else {
        const res = await Promise.all([
          fetchHook(`teams/${team.team_id}/members`),
          fetchHook(`teams/${team.team_id}/members/${contest.id}`),
        ])
        setTeamMembers(res[0].data)
        setAlreadyRegisteredMemberIds(new Set(res[1].data))
      }
    }

    init().finally(() => startTransition(() => setLoading(false)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, createdTeam, teamMembers, alreadyRegisteredMemberIds, registration, setRegistration }
}

async function fetchCreatedTeam(fetchHook: ReturnType<typeof useFetch>) {
  return fetchHook('users/me/created-team').then((r: any) => r.data)
}

async function fetchRegistration(fetchHook: ReturnType<typeof useFetch>, teamId: string, contestId: number) {
  const params = new URLSearchParams({
    team_id: teamId,
    contest_id: contestId.toString(),
  })

  return fetchHook(`contests/team/registration?${params.toString()}`).then((r: any) => r.data)
}
