import { redirect } from 'react-router-dom'
import getPathFromURL from '../utils/getPathFromURL'
import fetchWithCredentials from '../utils/fetchWithCredentials'
import nprogress from 'nprogress'

const isAuthenticated = async () => {
  try {
    await fetchWithCredentials('auth/check-auth')
    return true
  } catch {
    return false
  }
}

export const allowIfAuthenticated = async ({ request }) => {
  nprogress.start()
  const authenticated = await isAuthenticated()
  nprogress.done()

  if (!authenticated) {
    return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
  }
  return null
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
