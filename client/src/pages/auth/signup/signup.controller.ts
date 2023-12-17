import { useMemo, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import {
  useForm,
  type FieldErrors,
  type UseFormSetError,
  type UseFormClearErrors,
  type UseFormRegister,
} from 'react-hook-form'
import { useFetch } from '~/hooks/common/useFetch'
import { trim } from '@arpansaha13/utils'

interface Field extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  validationError?: string | null
}

interface SignUpFormData {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  username: string
  institution: string
  password: string
  confirm_password: string
  avatar_idx: string
}

export function useSignUpController() {
  const { formState, register: formRegister, handleSubmit, setError, clearErrors } = useForm<SignUpFormData>()

  const [searchParams] = useSearchParams()
  const { setAllNotification } = useOutletContext() as any // FIXME: fix types

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const fields = useMemo(() => getFields(formState.errors, formRegister), [formState.errors])

  const signUp = handleSubmit((formData: SignUpFormData) => {
    if (!formIsValid(formData, setError, clearErrors)) return

    prepareRequestBody(formData)
    setLoading(true)

    fetchHook('auth/register', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        setAllNotification({
          show: true,
          title: 'Account created!',
          description: res.message,
          status: 'success',
        })
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Registration failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  })

  return { loading, fields, searchParams, signUp }
}

function formIsValid(
  formData: SignUpFormData,
  setError: UseFormSetError<SignUpFormData>,
  clearErrors: UseFormClearErrors<SignUpFormData>
): boolean {
  let isValid = true

  if (!passwordIsValid(formData.password, formData.confirm_password, setError, clearErrors)) {
    isValid = false
  }

  if (!usernameIsValid(formData.username, setError, clearErrors)) {
    isValid = false
  }

  return isValid
}
function passwordIsValid(
  password: string,
  confirm_password: string,
  setError: UseFormSetError<SignUpFormData>,
  clearErrors: UseFormClearErrors<SignUpFormData>
): boolean {
  let isValid = true
  let passwordMismatch = false

  if (password !== confirm_password) {
    isValid = false
    passwordMismatch = true
  } else {
    clearErrors(['password', 'confirm_password'])
  }

  if (passwordMismatch) {
    const message = 'Passwords do not match'

    setError('password', { type: 'custom', message })
    setError('confirm_password', { type: 'custom', message })
  }

  return isValid
}

function usernameIsValid(
  username: string,
  setError: UseFormSetError<SignUpFormData>,
  clearErrors: UseFormClearErrors<SignUpFormData>
): boolean {
  const spacialChars = /[ `!@#$%^&*()+\-=[\]{};':"\\|,<>/?~]/
  const consecutiveDots = /\.{2,}/g
  const containsUppercase = /[A-Z]/

  let message = null

  if (username.includes(' ')) {
    message = 'Username cannot contain any spaces'
  } else if (spacialChars.test(username)) {
    message = 'Username cannot contain special characters'
  } else if (consecutiveDots.test(username)) {
    message = 'Username cannot contain consecutive dots'
  } else if (containsUppercase.test(username)) {
    message = 'Uppercase characters are not allowed'
  } else {
    clearErrors('username')
    return true
  }

  setError('username', { type: 'custom', message: message! })
  return false
}

function prepareRequestBody(formData: SignUpFormData) {
  formData.first_name = trim(formData.first_name)
  formData.last_name = trim(formData.last_name)
  formData.institution = trim(formData.institution)
  formData['avatar_idx'] = String(parseInt(formData['phone_no']) % 10)
}

const getFields = (errors: FieldErrors<SignUpFormData>, formRegister: UseFormRegister<SignUpFormData>): Field[] => {
  const fields: Field[] = [
    {
      id: 'first-name',
      type: 'text',
      autoComplete: 'given-name',
      maxLength: 20,
      required: true,
      label: 'First name',
      ...formRegister('first_name'),
    },
    {
      id: 'last-name',
      type: 'text',
      autoComplete: 'family-name',
      maxLength: 20,
      required: true,
      label: 'Last name',
      ...formRegister('last_name'),
    },
    {
      id: 'username',
      type: 'text',
      autoComplete: 'username',
      autoCapitalize: 'none',
      required: true,
      label: 'Username',
      minLength: 6,
      maxLength: 16,
      validationError: errors.username?.message,
      ...formRegister('username'),
    },
    {
      id: 'email',
      type: 'email',
      autoComplete: 'email',
      required: true,
      label: 'Email address',
      ...formRegister('email'),
    },
    {
      id: 'institution',
      type: 'text',
      autoComplete: 'organization',
      autoCapitalize: 'words',
      required: true,
      minLength: 3,
      maxLength: 50,
      label: 'Institution',
      ...formRegister('institution'),
    },
    {
      id: 'phone',
      type: 'tel',
      autoComplete: 'tel',
      inputMode: 'numeric',
      required: true,
      label: 'Phone number',
      pattern: '^[0-9]+$',
      title: 'This field should contain only digits',
      minLength: 10,
      maxLength: 10,
      ...formRegister('phone_no'),
    },
    {
      id: 'password',
      type: 'password',
      autoComplete: 'new-password',
      required: true,
      minLength: 8,
      maxLength: 30,
      label: 'Password',
      validationError: errors.password?.message,
      ...formRegister('password'),
    },
    {
      id: 'confirm-password',
      type: 'password',
      autoComplete: 'new-password',
      required: true,
      label: 'Confirm password',
      validationError: errors.confirm_password?.message,
      ...formRegister('confirm_password'),
    },
  ]
  return fields
}
