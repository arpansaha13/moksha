import { useCallback, useRef, useState } from 'react'
import { useFetch } from '~/hooks/common/useFetch'
import { useMap } from '~/hooks/common/useMap'
import { useNotification } from '~/hooks/useNotification'
import getFormData from '~/utils/getFormData'

const PASSWORD_MISMATCHED_MESSAGE = 'Password and confirm-password do not match'

export function useChangePasswordController() {
  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [notification, { set, setAll }] = useNotification()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setShowNotification = useCallback((bool: boolean) => set('show', bool), [])

  const [validationErrors, { set: setError }] = useMap<Record<string, string | null>>({
    old_password: null,
    new_password: null,
    confirm_password: null,
  })

  function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current)

    if (formData.new_password !== formData.confirm_password) {
      setError('new_password', PASSWORD_MISMATCHED_MESSAGE)
      setError('confirm_password', PASSWORD_MISMATCHED_MESSAGE)
      setLoading(false)
      return
    } else if (validationErrors.new_password) {
      setError('new_password', null)
      setError('confirm_password', null)
    }

    fetchHook('auth/change-password', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        setAll({
          show: true,
          title: 'Password updated!',
          description: res.message,
          status: 'success',
        })
      })
      .catch(err => {
        setAll({
          show: true,
          title: 'Failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  }

  return { formRef, loading, notification, validationErrors, changePassword, setShowNotification }
}
