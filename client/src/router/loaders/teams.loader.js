import { redirect } from 'react-router-dom'
import getPathFromURL from '~/utils/getPathFromURL'
import fetchWithCredentials from '~/utils/fetchWithCredentials'
import loaderWrapper from './loaderWrapper'

export const allowIfNoTeamCreated = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    try {
      const res = await fetchWithCredentials('users/me/created-team')

      return res.data
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
    const data = {}

    try {
      const teamId = request.url.substring(request.url.lastIndexOf('/') + 1)
      const res = await Promise.all([
        fetchWithCredentials(`teams/${teamId}`),
        fetchWithCredentials(`teams/${teamId}/members`),
      ])

      data.team = res[0].data
      data.members = res[1].data

      return data
    } catch (e) {
      if (e.status === '404') throw e

      return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
    }
  },
})
