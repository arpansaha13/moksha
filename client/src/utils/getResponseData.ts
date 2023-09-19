import AES from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

export default async function getResponseData<T = any>(res: Response): Promise<T> {
  const ciphertext = await res.text()

  const bytes = AES.decrypt(ciphertext, import.meta.env.VITE_PAYLOAD_SECRET)
  const jsonData: T = JSON.parse(bytes.toString(encUtf8))

  return jsonData
}
