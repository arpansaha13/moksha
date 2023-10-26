import { useEffect, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useFetch } from '~/hooks/common/useFetch'
import type { TeamRegistrationsPanelProps } from './team-registrations-panel.types'

export function useTeamRegistrationsPanelController({ contest }: TeamRegistrationsPanelProps) {
  const fetchHook = useFetch()
  const [reg, setReg] = useState(null)
  const [createdTeamReg, setCreatedTeamReg] = useState(null)
  const [hasCreatedTeam, setHasCreatedTeam] = useState(false)
  const [fromCreatedTeam, setFromCreatedTeam] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchAuthUserReg(fetchHook, contest.id), fetchCreatedTeamReg(fetchHook, contest.id)])
      .then(res => {
        setReg(res[0])
        setHasCreatedTeam(res[1].hasCreatedTeam)

        if (!res[1].hasCreatedTeam) return

        setCreatedTeamReg(res[1].data)
        setFromCreatedTeam(
          !isNullOrUndefined(res[0]) && !isNullOrUndefined(res[1].data) && res[0].id === res[1].data.id
        )
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    reg,
    loading,
    createdTeamReg,
    fromCreatedTeam,
    hasCreatedTeam,
  }
}

async function fetchAuthUserReg(fetchHook: ReturnType<typeof useFetch<any>>, contestId: number) {
  const params = new URLSearchParams({ contest_id: contestId.toString() }).toString()
  const res = await fetchHook(`users/me/registered-team-contests?${params}`)
  return res.data?.team_contest_registration
}

async function fetchCreatedTeamReg(fetchHook: ReturnType<typeof useFetch<any>>, contestId: number) {
  const { data: team } = await fetchHook('users/me/created-team')

  if (isNullOrUndefined(team)) return { hasCreatedTeam: false, data: null }

  const params = new URLSearchParams({ contest_id: contestId.toString() }).toString()
  const res = await fetchHook(`teams/${team.team_id}/registered-contests?${params}`)
  return { hasCreatedTeam: true, data: res.data }
}
