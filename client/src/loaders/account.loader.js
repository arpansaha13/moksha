import nprogress from 'nprogress'
import { redirect } from 'react-router-dom'
import getPathFromURL from '../utils/getPathFromURL'
import fetchWithCredentials from '../utils/fetchWithCredentials'

export async function getAuthUserTeams({ request }) {
  try {
    nprogress.start()

    const data = { createdTeam: null, joinedTeams: null }

    const res = await Promise.all([fetchWithCredentials('teams/created'), fetchWithCredentials('teams/joined')])

    data.createdTeam = res[0].data
    data.joinedTeams = res[1].data

    nprogress.done()
    return data
  } catch {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}

export async function getAuthUserContests({ request }) {
  try {
    nprogress.start()

    const data = { soloRegistrations: [], teamRegistrations: [] }

    const res = await Promise.all([fetchWithCredentials('users/me/contests/solo')])

    data.soloRegistrations = res[0].data
    // data.teamRegistrations = res[1].data

    nprogress.done()
    return data
  } catch {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}
