import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '~/store'
import createRequest, { type RequestOptions } from '~/utils/createRequest'
import getResponseData from '~/utils/getResponseData'

/** Returns a wrapper over the Fetch API. */

export function useFetch<T = any>() {
  const resetAuthState = useStore(state => state.resetAuthState)
  const navigate = useNavigate()
  const location = useLocation()

  const fetchHook = useCallback(async (url: string, options?: RequestOptions): Promise<T | void> => {
    const request = createRequest(url, options)

    const res = await fetch(request)

    if (res.status === 204) return

    const jsonData = await getResponseData<T>(res)

    if (res.status >= 400) {
      // Automatically go to login page if token expires
      // If auth token expires, it will raise 403 exception
      if (res.status === 403) {
        resetAuthState()
        if (!location.pathname.startsWith('/auth/')) navigate('/auth/login')
      }
      throw jsonData
    }
    return jsonData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return fetchHook
}
