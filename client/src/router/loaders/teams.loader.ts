import { redirect } from 'react-router-dom'
import { useStore } from '~/store'
import getPathFromURL from '~/utils/getPathFromURL'
import fetchWithCredentials from '~/utils/fetchWithCredentials'
import loaderWrapper from './loaderWrapper'
import type { TeamPendingInvite, Team, User } from '~/types'

export const allowIfNoTeamCreated = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    try {
      const res = await fetchWithCredentials('users/me/created-team')
      return res
    } catch {
      return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
    }
  },
})

export const getTeamData = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    try {
      const authState = useStore.getState().authState
      const teamId = request.url.substring(request.url.lastIndexOf('/') + 1)

      const { team, members } = await getPublicTeamData(teamId)

      const isLeader = team.leader.id === authState.user_id
      const isMember = isLeader || members.findIndex(m => m.id === authState.user_id) !== -1

      const { pendingInvites, registeredContests } = await getPrivateTeamData(teamId, isLeader, isMember)

      return { team, members, isLeader, isMember, pendingInvites, registeredContests }
    } catch (e: any) {
      if (e.status === '404') throw e

      return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
    }
  },
})

async function getPublicTeamData(teamId: string) {
  const [team, members] = await Promise.all([
    fetchWithCredentials(`teams/${teamId}`) as Promise<Team>,
    fetchWithCredentials(`teams/${teamId}/members`) as Promise<User[]>,
  ])

  return { team, members }
}

async function getPrivateTeamData(teamId: string, isLeader: boolean, isMember: boolean) {
  const [pendingInvites, registeredContests] = await Promise.all([
    isLeader ? (fetchWithCredentials(`teams/${teamId}/pending-invites`) as Promise<TeamPendingInvite[]>) : [],
    isMember ? fetchWithCredentials(`teams/${teamId}/registered-contests`) : [],
  ])

  return {
    pendingInvites,
    registeredContests,
  }
}
