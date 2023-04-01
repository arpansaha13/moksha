import { redirect } from 'react-router-dom'
import getPathFromURL from '../../utils/getPathFromURL'
import fetchWithCredentials from '../../utils/fetchWithCredentials'
import nprogress from 'nprogress'

export async function getTeamData({ request }) {
  try {
    nprogress.start()

    const teamId = request.url.substring(request.url.lastIndexOf('/') + 1)
    const res = await Promise.all([
      fetchWithCredentials(`teams/${teamId}`),
      fetchWithCredentials(`teams/${teamId}/members`),
      fetchWithCredentials(`invites/${teamId}`),
    ])

    nprogress.done()

    return { team: res[0].data, members: res[1].data, pendingInvites: res[2].data }
  } catch {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}
