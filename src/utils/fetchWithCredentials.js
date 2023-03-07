import createRequest from "./createRequest"

/**
 * Use this function for calling fetch outside Router context.
 */
export default async function fetchWithCredentials(url, options) {
  const request = createRequest(url, options)

  const res = await fetch(request)
  const jsonData = await res.json()

  if (res.status >= 400) {
    throw jsonData
  }
  return jsonData
}
