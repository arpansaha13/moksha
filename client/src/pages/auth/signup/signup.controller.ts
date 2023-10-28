import { useCallback, useMemo, useRef, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { useMap } from '~/hooks/common/useMap'
import { useFetch } from '~/hooks/common/useFetch'
import getFormData from '~/utils/getFormData'
import { trim } from '@arpansaha13/utils'

interface Field extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  validationError?: string | null
}

export function useSignUpController() {
  const [searchParams] = useSearchParams()
  const { setAllNotification } = useOutletContext() as any // FIXME: fix types

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const [validationErrors, { set: setError }] = useMap<Record<string, string | null>>({
    username: null,
    password: null,
    confirm_password: null,
  })

  const fields = useMemo(() => getFields(validationErrors), [validationErrors])

  const signUp = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = getFormData(formRef.current)

      let hasError = false

      if (formData.password !== formData.confirm_password) {
        setError('password', 'Password and confirm-password do not match')
        setError('confirm_password', 'Password and confirm-password do not match')
        hasError = true
      } else if (validationErrors.password) {
        setError('password', null)
        setError('confirm_password', null)
      }

      if (!validateUsername(formData.username as string, setError)) {
        hasError = true
      }

      if (hasError) return

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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validationErrors, formRef]
  )

  return { formRef, loading, fields, searchParams, signUp }
}

function validateUsername(username: string, setError: (key: string, value: string | null) => void): boolean {
  const spacialChars = /[ `!@#$%^&*()+\-=[\]{};':"\\|,<>/?~]/
  const consecutiveDots = /\.{2,}/g

  if (username.includes(' ')) {
    setError('username', 'Username cannot contain any spaces')
  } else if (spacialChars.test(username)) {
    setError('username', 'Username cannot contain special characters')
  } else if (consecutiveDots.test(username)) {
    setError('username', 'Username cannot contain consecutive dots')
  } else {
    setError('username', null)
    return true
  }
  return false
}

function prepareRequestBody(formData: ReturnType<typeof getFormData>) {
  formData.name = trim(formData.name as string)
  formData.institution = trim(formData.institution as string)
  formData['avatar_idx'] = String(Number(formData['phone_no']) % 10)
  formData['username'] = (formData['username'] as string).toLowerCase() // force lowercase
}

const getFields = (validationErrors: Record<string, string | null>): Field[] => {
  const fields: Field[] = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      autoComplete: 'name',
      autoCapitalize: 'words',
      maxLength: 20,
      required: true,
      label: 'Name',
    },
    {
      id: 'username',
      name: 'username',
      type: 'text',
      autoComplete: 'username',
      autoCapitalize: 'none',
      required: true,
      label: 'Username',
      minLength: 6,
      maxLength: 16,
      validationError: validationErrors.username,
      style: { textTransform: 'lowercase' }, // force lowercase
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      autoComplete: 'email',
      required: true,
      label: 'Email address',
    },
    {
      id: 'institution',
      name: 'institution',
      type: 'text',
      autoComplete: 'organization',
      autoCapitalize: 'words',
      required: true,
      minLength: 3,
      maxLength: 50,
      label: 'Institution',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      autoComplete: 'new-password',
      required: true,
      minLength: 8,
      maxLength: 30,
      label: 'Password',
      validationError: validationErrors.password,
    },
    {
      id: 'phone',
      name: 'phone_no',
      type: 'tel',
      autoComplete: 'tel',
      inputMode: 'numeric',
      required: true,
      label: 'Phone number',
      pattern: '[0-9]{10}',
      minLength: 10,
      maxLength: 10,
    },
    {
      id: 'confirm-password',
      name: 'confirm_password',
      type: 'password',
      autoComplete: 'new-password',
      required: true,
      label: 'Confirm password',
      validationError: validationErrors.confirm_password,
    },
  ]
  return fields
}
