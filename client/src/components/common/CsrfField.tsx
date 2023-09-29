import { getCookie } from '@arpansaha13/utils/browser'
import { useEffect, useState } from 'react'

const CsrfField = () => {
  const [csrftoken, setCsrfToken] = useState('')

  useEffect(() => {
    setCsrfToken(getCookie('csrftoken') ?? '')
  }, [])

  return <input name='csrfmiddlewaretoken' value={csrftoken} type='hidden' />
}

export default CsrfField
