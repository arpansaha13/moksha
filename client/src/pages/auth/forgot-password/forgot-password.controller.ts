import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'

interface ForgotPasswordFormData {
  email: string
}

export function useForgotPasswordController() {
  const { register: formRegister, handleSubmit } = useForm<ForgotPasswordFormData>()

  const fetchHook = useFetch()
  const { setAllNotification } = useOutletContext() as any // FIXME: fix types

  const [loading, setLoading] = useState(false)

  const forgotPassword = handleSubmit((formData: ForgotPasswordFormData) => {
    setLoading(true)

    fetchHook('auth/forgot-password', {
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
          title: 'Failure',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  })

  return { loading, formRegister, forgotPassword }
}
