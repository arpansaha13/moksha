import AES from 'crypto-js/aes'
import { getCookie } from '@arpansaha13/utils/browser'

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  /** @default 'GET' */
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

  body?: Record<string, any>
}

export const FETCH_BASE_URL = import.meta.env.DEV ? 'http://localhost:8000' : window.location.origin

/**
 * Create request object for Fetch API with credentials allowed.
 */
export default function createRequest(url: string, options: RequestOptions = {}): Request {
  let headers: RequestOptions['headers'] = {
    'Content-Type': 'text/plain',
  }

  if (options?.method && options.method !== 'GET') {
    const csrftoken = getCookie('csrftoken')
    if (csrftoken) headers['x-csrftoken'] = csrftoken
  }

  if (options?.headers) {
    headers = {
      ...options.headers,
      ...headers,
    }
  }

  let body

  if (options?.body) {
    const stringified = JSON.stringify(options.body)
    body = AES.encrypt(stringified, import.meta.env.VITE_PAYLOAD_SECRET).toString()
  }

  if (import.meta.env.DEV) {
    options.mode = 'cors'
  }

  return new Request(`${FETCH_BASE_URL}/api/${url}`, {
    ...options,
    credentials: 'include',
    body,
    headers,
  })
}
