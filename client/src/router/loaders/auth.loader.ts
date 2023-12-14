import { redirect } from 'react-router-dom'
import { isNullOrUndefined } from '@arpansaha13/utils'
import getPathFromURL from '~/utils/getPathFromURL'
import fetchWithCredentials from '~/utils/fetchWithCredentials'
import loaderWrapper from './loaderWrapper'

const isAuthenticated = async () => {
  const res = await fetchWithCredentials('auth/check-auth')
  return !isNullOrUndefined(res)
}

export const allowIfNotAuthenticated = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async () => {
    const authenticated = await isAuthenticated()
    if (authenticated) return redirect('/')
    return null
  },
})

export const getAuthUserData = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    try {
      const res = await fetchWithCredentials('users/me')
      return res
    } catch {
      return redirect(`/auth/login?from=${encodeURIComponent(getPathFromURL(request.url))}`)
    }
  },
})

export const getVerificationLinkValidity = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    const pathSegments = new URL(request.url).pathname.split('/')
    const hash = pathSegments.at(-1)

    const res = await fetchWithCredentials(`auth/validate-link/account/${hash}`)
    return res.valid
  },
})

export const getForgotPassLinkValidity = loaderWrapper({
  meta: {
    type: 'page',
  },
  fn: async ({ request }) => {
    const pathSegments = new URL(request.url).pathname.split('/')
    const hash = pathSegments.at(-1)

    const res = await fetchWithCredentials(`auth/validate-link/reset-pass/${hash}`)
    return res.valid
  },
})
