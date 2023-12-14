import { redirect } from 'react-router-dom'
import getPathFromURL from '~/utils/getPathFromURL'
import fetchWithCredentials from '~/utils/fetchWithCredentials'
import loaderWrapper from './loaderWrapper'

export const getReceivedTeamInvites = loaderWrapper({
  meta: {
    type: 'layout',
  },
  fn: async ({ request }) => {
    try {
      const res = await fetchWithCredentials('users/me/received-team-invites')
      return { receivedInvites: res }
    } catch {
      return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
    }
  },
})

export const getAuthUserTeams = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    try {
      const data = { createdTeam: null, joinedTeams: null }

      const res = await Promise.all([
        fetchWithCredentials('users/me/created-team'),
        fetchWithCredentials('users/me/joined-teams'),
      ])

      data.createdTeam = res[0]
      data.joinedTeams = res[1]
      return data
    } catch {
      return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
    }
  },
})

export const getAuthUserContests = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    try {
      const data = { soloContests: [] as any[], teamContests: [] as any[] }

      const res = await Promise.all([
        fetchWithCredentials('users/me/registered-solo-contests'),
        fetchWithCredentials('users/me/registered-team-contests'),
      ])

      data.soloContests = res[0]
      data.teamContests = res[1]

      return data
    } catch {
      return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
    }
  },
})
