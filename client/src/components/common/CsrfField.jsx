import { getCookie } from '@arpansaha13/utils/browser'

const csrftoken = getCookie('csrftoken')

const CsrfField = () => {
  return <input name='csrfmiddlewaretoken' value={csrftoken} type='hidden' />
}

export default CsrfField
