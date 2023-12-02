import { useCallback, useState } from 'react'
import { useForm, type SubmitHandler, type UseFormSetError, type UseFormClearErrors } from 'react-hook-form'
import { useFetch } from '~/hooks/common/useFetch'
import { useNotification } from '~/hooks/useNotification'

interface ChangePasswordFormData {
  old_password: string
  new_password: string
  confirm_password: string
}

export function useChangePasswordController() {
  const { formState, register: formRegister, handleSubmit, setError, clearErrors } = useForm<ChangePasswordFormData>()

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const [notification, { set, setAll }] = useNotification()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setShowNotification = useCallback((bool: boolean) => set('show', bool), [])

  const changePassword: SubmitHandler<ChangePasswordFormData> = formData => {
    if (!formIsValid(formData, setError, clearErrors)) return

    setLoading(true)

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

  return {
    loading,
    notification,
    validationErrors: formState.errors,
    formRegister,
    setShowNotification,
    changePassword: handleSubmit(changePassword),
  }
}

function formIsValid(
  formData: ChangePasswordFormData,
  setError: UseFormSetError<ChangePasswordFormData>,
  clearErrors: UseFormClearErrors<ChangePasswordFormData>
): boolean {
  let isValid = true

  if (formData.old_password === formData.new_password) {
    isValid = false
    setError('old_password', { type: 'custom', message: 'Old password cannot be same as new password' })
  } else {
    clearErrors('old_password')
  }

  if (formData.new_password !== formData.confirm_password) {
    isValid = false
    const PASSWORD_MISMATCH_MESSAGE = 'Passwords do not match'
    setError('new_password', { type: 'custom', message: PASSWORD_MISMATCH_MESSAGE })
    setError('confirm_password', { type: 'custom', message: PASSWORD_MISMATCH_MESSAGE })
  } else {
    clearErrors(['new_password', 'confirm_password'])
  }

  return isValid
}
