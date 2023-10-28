import { useRef, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import { useMap } from '~/hooks/common/useMap'
import getFormData from '~/utils/getFormData'

const PASSWORD_MISMATCH_MESSAGE = 'Password and confirm-password do not match'

export function useResetPasswordController() {
  const params = useParams()
  const { setNotification, setAllNotification } = useOutletContext() as any // FIXME: fix types

  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [passIsReset, setPassIsReset] = useState(false)

  const [validationErrors, { set: setError }] = useMap<Record<string, string | null>>({
    password: null,
    confirm_password: null,
  })

  function resetPass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current)

    if (formData.password !== formData.confirm_password) {
      setError('password', PASSWORD_MISMATCH_MESSAGE)
      setError('confirm_password', PASSWORD_MISMATCH_MESSAGE)
      setLoading(false)
      return
    } else if (validationErrors.password) {
      setError('password', null)
      setError('confirm_password', null)
    }

    fetchHook(`auth/reset-password/${params.hash}`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        setPassIsReset(true)
        setNotification('show', false)
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Validation failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  }

  return { formRef, passIsReset, loading, validationErrors, resetPass }
}
