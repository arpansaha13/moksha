import nprogress from 'nprogress'
import { redirect } from 'react-router-dom'
import { isNullOrUndefined } from '@arpansaha13/utils'
import getPathFromURL from '~/utils/getPathFromURL'
import fetchWithCredentials from '~/utils/fetchWithCredentials'

const isAuthenticated = async () => {
  const { data } = await fetchWithCredentials('auth/check-auth')
  return !isNullOrUndefined(data)
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

export async function getLinkValidity({ request }) {
  const pathSegments = new URL(request.url).pathname.split('/')
  const hash = pathSegments.at(-1)

  const res = await fetchWithCredentials(`auth/validate-link/account/${hash}`)
  return res.valid
}
