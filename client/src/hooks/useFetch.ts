import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '~/containers/DataProvider'
import createRequest, { type RequestOptions } from '~/utils/createRequest'
import getResponseData from '~/utils/getResponseData'

/**
 * Returns a wrapper over the Fetch API.
 *
 * 1) Extracts and returns the json response so that the json data is directly available in the then() block.
 *
 * 2) Automatically go to login page if token expires
 */

export function useFetch<T = any>() {
  const { resetAppContext } = useAppContext() as any
  const navigate = useNavigate()
  const location = useLocation()

  const fetchHook = useCallback(async (url: string, options?: RequestOptions) => {
    const request = createRequest(url, options)

    const res = await fetch(request)

    if (res.status === 204) return

    const jsonData = await getResponseData<T>(res)

    if (res.status >= 400) {
      // If auth token expires, it will raise 403 exception
      if (res.status === 403) {
        resetAppContext()
        if (!location.pathname.startsWith('/auth/')) navigate('/auth/login')
      }
      throw jsonData
    }
    return jsonData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return fetchHook
}
