import { useState } from 'react'
import { useForm, type UseFormSetError, type UseFormClearErrors } from 'react-hook-form'
import { useOutletContext, useParams } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import type { ResetPassFormProps } from './reset-password.types'

interface ResetPasswordFormData {
  password: string
  confirm_password: string
}

export function useResetPasswordController({ setPassIsReset }: ResetPassFormProps) {
  const { formState, register: formRegister, handleSubmit, setError, clearErrors } = useForm<ResetPasswordFormData>()

  const params = useParams()
  const { setNotification, setAllNotification } = useOutletContext() as any // FIXME: fix types

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const resetPass = handleSubmit((formData: ResetPasswordFormData) => {
    if (!formIsValid(formData, setError, clearErrors)) return

    setLoading(true)

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
  })

  return { loading, validationErrors: formState.errors, formRegister, resetPass }
}

function formIsValid(
  formData: ResetPasswordFormData,
  setError: UseFormSetError<ResetPasswordFormData>,
  clearErrors: UseFormClearErrors<ResetPasswordFormData>
): boolean {
  let isValid = true

  const PASSWORD_MISMATCH_MESSAGE = 'Passwords do not match'

  if (formData.password !== formData.confirm_password) {
    isValid = false

    setError('password', {
      type: 'custom',
      message: PASSWORD_MISMATCH_MESSAGE,
    })
    setError('confirm_password', {
      type: 'custom',
      message: PASSWORD_MISMATCH_MESSAGE,
    })
  } else {
    clearErrors(['password', 'confirm_password'])
  }

  return isValid
}
