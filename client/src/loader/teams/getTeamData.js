import { redirect } from 'react-router-dom'
import getPathFromURL from '../../utils/getPathFromURL'
import fetchWithCredentials from '../../utils/fetchWithCredentials'
import nprogress from 'nprogress'

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

    // Will fail if not leader
    data.pendingInvites = await fetchWithCredentials(`invites/${teamId}`).then(r => r.data)

    nprogress.done()
    return data
  } catch (e) {
    if (e.message === 'Forbidden') {
      data.pendingInvites = []

      nprogress.done()
      return data
    }

    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}
