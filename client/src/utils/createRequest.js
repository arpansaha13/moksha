import { FETCH_BASE_URL } from '../constants'
import { getCookie } from '@arpansaha13/utils/browser'

/**
 * Create request object for Fetch API with credentials allowed.
 */
export default function createRequest(url, options) {
  const csrftoken = getCookie('csrftoken')

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  if (csrftoken) headers['x-csrftoken'] = csrftoken

  if (options?.headers) {
    headers = {
      ...options.headers,
      ...headers,
    }
  }

  return new Request(`${FETCH_BASE_URL}${url}`, {
    ...options,
    mode: 'cors',
    credentials: 'include',
    body: options?.body ? new URLSearchParams(JSON.parse(options?.body)) : null,
    headers,
  })
}
