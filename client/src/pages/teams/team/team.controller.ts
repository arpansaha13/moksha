/* eslint-disable react-hooks/exhaustive-deps */
import { startTransition, useCallback, useEffect, useMemo, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useAppContext } from '~/containers/DataProvider'
import { useFetch } from '~/hooks/common/useFetch'
import { useDebouncedFn } from '~/hooks/common/useDebouncedFn'
import type { User, Team } from '~/types'
import type { RegisteredContestsProps } from './team.types'

interface LoaderData {
  team: Team
  members: User[]
}

export function useTeamController() {
  const fetchHook = useFetch()
  const { appContext } = useAppContext()!
  const { team, members } = useLoaderData() as LoaderData
  const [pendingInvites, setPendingInvites] = useState([])
  const [loadingInvites, setLoadingInvites] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const isLeader = team.leader.user_id === appContext.user_id

  const isMember = useMemo(() => isLeader || members.findIndex(m => m.user_id === appContext.user_id) !== -1, [])

  useEffect(() => {
    if (isLeader) {
      fetchHook(`teams/${team.team_id}/pending-invites`).then(r => {
        setPendingInvites(r.data)
        startTransition(() => setLoadingInvites(false))
      })
    }
  }, [])

  const refetchPendingInvites = useDebouncedFn(
    async () => {
      const res = await fetchHook(`teams/${team.team_id}/pending-invites`)
      setPendingInvites(res.data)
    },
    500,
    []
  )

  const inviteCall = useCallback(async (userId: string) => {
    await fetchHook('invites', {
      method: 'POST',
      body: {
        team_id: team.team_id,
        user_id: userId,
      },
    })
  }, [])

  const withdrawInviteCall = useCallback(async (userId: string) => {
    await fetchHook('invites', {
      method: 'DELETE',
      body: {
        team_id: team.team_id,
        user_id: userId,
      },
    })
  }, [])

  return {
    team,
    members,
    pendingInvites,
    loadingInvites,
    isLeader,
    isMember,
    modalOpen,
    setModalOpen,
    refetchPendingInvites,
    inviteCall,
    withdrawInviteCall,
  }
}

export function useRegisteredContestsController({ teamId }: RegisteredContestsProps) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(true)
  const [registrations, setRegistrations] = useState<any[]>([])

  useEffect(() => {
    fetchHook(`teams/${teamId}/registered-contests`)
      .then(r => setRegistrations(r.data))
      .finally(() => {
        startTransition(() => setLoading(false))
      })
  }, [])

  return { loading, registrations }
}
