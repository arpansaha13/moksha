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

    const data = { soloContests: [], teamContests: [] }

    const res = await Promise.all([fetchWithCredentials('/me/contests/solo')])

    data.soloContests = res[0].data
    // data.teamContests = res[1].data

    nprogress.done()
    return data
  } catch {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}
