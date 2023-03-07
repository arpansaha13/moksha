import { useNavigate, useLocation } from 'react-router-dom'
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
 * 5) Automatically navigate to Login page when auth token expires.
 *
 * Note:
 *
 * 1) Body data (if provided) must be a stringified JSON.
 *
 * 2) It uses `useNavigate` and `useLocation` internally. So this hook has to be used within Router context.
 */

export function useFetch() {
  const navigate = useNavigate()
  const location = useLocation()

  return async function fetchHook(url, options) {
    const request = createRequest(url, options)

    const res = await fetch(request)
    const jsonData = await res.json()

    console.log(location.pathname)

    if (res.status >= 400) {
      if (res.status === 401 && !location.pathname.startsWith('/auth/')) {
        navigate('/auth/login')
      }
      throw jsonData
    }
    return jsonData
  }
}
