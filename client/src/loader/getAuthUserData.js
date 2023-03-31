import { redirect } from 'react-router-dom'
import getPathFromURL from '../utils/getPathFromURL'
import fetchWithCredentials from '../utils/fetchWithCredentials'
import nprogress from 'nprogress'

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
