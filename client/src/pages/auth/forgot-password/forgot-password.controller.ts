import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import getFormData from '~/utils/getFormData'

export function useForgotPasswordController() {
  const fetchHook = useFetch()
  const { setAllNotification } = useOutletContext() as any // FIXME: fix types

  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  function forgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current)

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
  }

  return { formRef, loading, forgotPassword }
}
