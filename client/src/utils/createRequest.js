import { FETCH_BASE_URL } from '../constants'

/**
 * Create request object for Fetch API with credentials allowed.
 */
export default function createRequest(url, options) {
  return new Request(`${FETCH_BASE_URL}${url}`, {
    ...options,
    mode: 'cors',
    credentials: 'include',
    body: options?.body ? new URLSearchParams(JSON.parse(options?.body)) : null,
    headers: {
      ...(options?.headers ?? {}),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
