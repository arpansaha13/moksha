import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import getFormData from '~/utils/getFormData'

export function useResendVerificationLinkController() {
  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const { setAllNotification } = useOutletContext() as any // FIXME: fix types

  function resendLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current)

    fetchHook('auth/resend-verification-link', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        setAllNotification({
          show: true,
          title: 'Email sent',
          description: res.message,
          status: 'success',
        })
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Failed to send link',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { formRef, loading, resendLink }
}
