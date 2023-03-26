import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../containers/DataProvider'
import createRequest from '../utils/createRequest'

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
 * 5) Automatically go to login page if token expires
 *
 * Note:
 *
 * 1) Body data (if provided) must be a stringified JSON.
 */

export function useFetch() {
  const { resetAppContext } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchHook = useCallback(async (url, options) => {
    const request = createRequest(url, options)

    const res = await fetch(request)
    const jsonData = await res.json()

    if (res.status >= 400) {
      // If auth token expires, it will raise 403 exception
      if (res.status === 403) {
        resetAppContext()
        if (!location.pathname.startsWith('/auth/')) navigate('/auth/login')
      }
      throw jsonData
    }
    return jsonData
  }, [])

  return fetchHook
}
