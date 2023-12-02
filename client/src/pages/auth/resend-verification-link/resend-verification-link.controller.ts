import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'

interface ResendVerificationLinkFormData {
  email: string
}

export function useResendVerificationLinkController() {
  const { register: formRegister, handleSubmit } = useForm<ResendVerificationLinkFormData>()

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const { setAllNotification } = useOutletContext() as any // FIXME: fix types

  const resendLink = handleSubmit((formData: ResendVerificationLinkFormData) => {
    setLoading(true)

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
  })

  return { loading, formRegister, resendLink }
}
