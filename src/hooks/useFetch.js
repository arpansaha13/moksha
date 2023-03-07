import { FETCH_BASE_URL } from '../constants'

/**
 * Returns a wrapper over the Fetch API.
 *
 * 1) Adds the required headers for cross-origin cookie transfer.
 *
 * 2) Adds the `Content-type` header as `application/x-www-form-urlencoded`.
 *
 * 3) Converts the JSON-stringified body-data to url-encoded form.
 *
 * 4) Extracts and returns the json response so that the json data is directly available in the then() block.
 *
 * Note: Body data (if provided) must be a stringified JSON.
 */

export function useFetch() {
  const fetchHook = (url, options) => {
    const request = new Request(`${FETCH_BASE_URL}${url}`, {
      ...options,
      mode: 'cors',
      credentials: 'include',
      body: options?.body ? new URLSearchParams(JSON.parse(options?.body)) : null,
      headers: {
        ...(options?.headers ?? {}),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return fetch(request).then(async res => {
      // Handle empty responses
      const textData = await res.text()
      let jsonData = null
      if (textData) {
        try {
          jsonData = JSON.parse(textData)
        } catch {
          jsonData = { message: textData }
        }
      }
      if (res.status >= 400) throw jsonData
      return { status: res.status, ...jsonData }
    })
  }
  return fetchHook
}
