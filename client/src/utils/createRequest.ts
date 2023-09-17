import { FETCH_BASE_URL } from '../constants'
import { getCookie } from '@arpansaha13/utils/browser'
import CryptoJS from 'crypto-js'

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, any> | null
}

/**
 * Create request object for Fetch API with credentials allowed.
 */
export default function createRequest(url: string, options: RequestOptions = {}): Request {
  const csrftoken = getCookie('csrftoken')

  let headers: RequestOptions['headers'] = {
    'Content-Type': 'text/plain',
  }

  if (csrftoken) headers['x-csrftoken'] = csrftoken

  if (options?.headers) {
    headers = {
      ...options.headers,
      ...headers,
    }
  }

  let body

  if (options?.body) {
    const stringified = JSON.stringify(options.body)
    body = CryptoJS.AES.encrypt(stringified, import.meta.env.VITE_PAYLOAD_SECRET).toString()
    console.log(body)
  }

  if (import.meta.env.DEV) {
    options.mode = 'cors'
  }

  return new Request(`${FETCH_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
    body,
    headers,
  })
}
