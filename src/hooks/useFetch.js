import { useCallback } from 'react';
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
  const { resetAppContext } = useAppContext()

  const fetchHook = useCallback(async (url, options) => {
    const request = createRequest(url, options)

    const res = await fetch(request)
    const jsonData = await res.json()

    if (res.status >= 400) {
      // Expired token gives 403 or 401 exception with a "detail" key in response object
      if ((res.status === 403 || res.status === 401 || jsonData.detail) && !location.pathname.startsWith('/auth/')) {
        resetAppContext()
        navigate('/auth/login')
      }
      throw jsonData
    }
    return jsonData
  }, [location.pathname])

  return fetchHook
}
