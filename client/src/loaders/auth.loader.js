import nprogress from 'nprogress'
import { redirect } from 'react-router-dom'
import getPathFromURL from '../utils/getPathFromURL'
import fetchWithCredentials from '../utils/fetchWithCredentials'

const isAuthenticated = async () => {
  try {
    await fetchWithCredentials('auth/check-auth')
    return true
  } catch {
    return false
  }
}

export const allowIfNotAuthenticated = async () => {
  nprogress.start()
  const authenticated = await isAuthenticated()
  nprogress.done()

  if (authenticated) {
    return redirect('/')
  }
  return null
}

export async function getAuthUserData({ request }) {
  try {
    nprogress.start()
    const res = await fetchWithCredentials('users/me')
    nprogress.done()
    return res.data
  } catch {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
}
