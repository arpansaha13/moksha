import nprogress from 'nprogress'
import { redirect } from 'react-router-dom'
import getPathFromURL from '../utils/getPathFromURL'
import fetchWithCredentials from '../utils/fetchWithCredentials'

export async function allowIfNoTeamCreated({ request }) {
  try {
    nprogress.start()

    const res = await fetchWithCredentials('users/me/created-team')

    nprogress.done()

    return res.data
  } catch {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}

export async function getTeamData({ request }) {
  const data = {}

  try {
    nprogress.start()

    const teamId = request.url.substring(request.url.lastIndexOf('/') + 1)
    const res = await Promise.all([
      fetchWithCredentials(`teams/${teamId}`),
      fetchWithCredentials(`teams/${teamId}/members`),
    ])

    data.team = res[0].data
    data.members = res[1].data

    nprogress.done()
    return data
  } catch {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}
