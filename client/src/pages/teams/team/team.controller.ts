/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import { useDebouncedFn } from '~/hooks/common/useDebouncedFn'
import type { User, Team, TeamPendingInvite } from '~/types'

interface LoaderData {
  team: Team
  members: User[]
  pendingInvites: TeamPendingInvite[]
  registeredContests: any[]
  isLeader: boolean
  isMember: boolean
}

export function useTeamController() {
  const {
    team,
    isLeader,
    isMember,
    members,
    pendingInvites: initialPendingInvites,
    registeredContests,
  } = useLoaderData() as LoaderData

  const fetchHook = useFetch()
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingInvites, setPendingInvites] = useState(initialPendingInvites)

  const refetchPendingInvites = useDebouncedFn(
    async () => {
      const res = await fetchHook(`teams/${team.team_id}/pending-invites`)
      setPendingInvites(res)
    },
    600,
    []
  )

  const inviteCall = useCallback(async (userId: User['id']) => {
    await fetchHook('invites', {
      method: 'POST',
      body: {
        team_id: team.team_id,
        user_id: userId,
      },
    })
  }, [])

  const withdrawInviteCall = useCallback(async (userId: User['id']) => {
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
    isLeader,
    isMember,
    modalOpen,
    pendingInvites,
    registeredContests,
    setModalOpen,
    inviteCall,
    withdrawInviteCall,
    refetchPendingInvites,
  }
}
