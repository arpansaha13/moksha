import { FETCH_BASE_URL } from '../constants'
import { getCookie } from '@arpansaha13/utils/browser'

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, any> | null
}

/**
 * Create request object for Fetch API with credentials allowed.
 */
export default function createRequest(url: string, options: RequestOptions = {}): Request {
  const csrftoken = getCookie('csrftoken')

  let headers: RequestOptions['headers'] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  if (csrftoken) headers['x-csrftoken'] = csrftoken

  if (options?.headers) {
    headers = {
      ...options.headers,
      ...headers,
    }
  }

  if (import.meta.env.DEV) {
    console.log(import.meta.env)
    options.mode = 'cors'
  }

  return new Request(`${FETCH_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
    body: options?.body ? new URLSearchParams(options.body) : null,
    headers,
  })
}
