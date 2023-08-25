import { useCallback, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom'
import { useMap } from '~/hooks/useMap'
import { useFetch } from '~/hooks/useFetch'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import CsrfField from '~common/CsrfField'
import getFormData from '~/utils/getFormData'

export function Component() {
  let [searchParams] = useSearchParams()
  const { setAllNotification } = useOutletContext()

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const [validationErrors, { set: setError }] = useMap({
    username: null,
    password: null,
    confirm_password: null,
  })

  const fields = useMemo(() => getFields(validationErrors), [validationErrors])

  const signUp = useCallback(
    e => {
      e.preventDefault()

      const formData = getFormData(formRef.current, { format: 'object' })
      formData['avatar_idx'] = formData['phone_no'] % 10
      formData['username'] = formData['username'].toLowerCase() // force lowercase

      let hasError = false

      if (formData.password !== formData.confirm_password) {
        setError('password', 'Password and confirm-password do not match')
        setError('confirm_password', 'Password and confirm-password do not match')
        hasError = true
      } else if (validationErrors.password) {
        setError('password', null)
        setError('confirm_password', null)
      }

      if (!validateUsername(formData.username, setError)) {
        hasError = true
      }

      if (hasError) return

      setLoading(true)

      fetchHook('auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
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

  return (
    <main className='sm:max-w-2xl px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Sign up</title>
      </Helmet>

      <form ref={formRef} className='space-y-6' onSubmit={signUp}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {fields.map(field => (
            <BaseInput key={field.id} {...field} />
          ))}
        </div>

        <CsrfField />

        <div className='text-sm 2xs:flex 2xs:items-center 2xs:justify-between space-y-3 2xs:space-y-0'>
          <div>
            <Link to='/auth/forgot-password'>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>
                Forgot <span className='hidden xs:inline'>your</span> password?
              </span>
            </Link>
          </div>

          <div>
            <Link to='/auth/resend-verification-link'>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>
                Resend verification link
              </span>
            </Link>
          </div>
        </div>

        <div>
          <BaseButton type='submit' stretch loading={loading}>
            Sign up
          </BaseButton>
        </div>

        <div className='flex items-center'>
          <div className='text-sm'>
            <span className='text-gray-100'>Already have an account?</span>{' '}
            <Link to={{ pathname: '/auth/login', search: searchParams.toString() }}>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>Login</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}
Component.displayName = 'SignUpPage'

function validateUsername(username, setError) {
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

const getFields = validationErrors => {
  const fields = [
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
      maxLength: 8,
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
