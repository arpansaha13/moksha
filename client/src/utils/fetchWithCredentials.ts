import createRequest, { type RequestOptions } from './createRequest'
import getResponseData from './getResponseData'

/**
 * Use this function for calling fetch outside Router context.
 */
export default async function fetchWithCredentials<T = any>(url: string, options?: RequestOptions): Promise<T | void> {
  const request = createRequest(url, options)

  const res = await fetch(request)
  if (res.status === 204) return

  const jsonData = await getResponseData<T>(res)

  if (res.status >= 400) {
    throw jsonData
  }
  return jsonData
}
