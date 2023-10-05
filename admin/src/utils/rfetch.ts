import AES from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

export default async function rfetch<T = any>(url: string): Promise<T | void> {
  const request = createRequest(url)

  const res = await fetch(request)
  const jsonData = await getResponseData<T>(res)

  if (res.status >= 400) {
    throw jsonData
  }
  return jsonData
}

export const FETCH_BASE_URL = import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_API_URL

function createRequest(url: string): Request {
  return new Request(`${FETCH_BASE_URL}/api/${url}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

async function getResponseData<T = any>(res: Response): Promise<T> {
  const ciphertext = await res.text()

  const bytes = AES.decrypt(ciphertext, import.meta.env.VITE_PAYLOAD_SECRET)
  const jsonData: T = JSON.parse(bytes.toString(encUtf8))

  return jsonData
}
