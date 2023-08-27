import { useCallback, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import { useFetch } from '~/hooks/useFetch'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import CsrfField from '~common/CsrfField'
import { useAppContext } from '~/containers/DataProvider'
import getFormData from '~/utils/getFormData'

export function Component() {
  const { setAppContext } = useAppContext()
  const { setNotification, setAllNotification } = useOutletContext()

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()

  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const signIn = useCallback(
    e => {
      e.preventDefault()
      setLoading(true)

      const formData = getFormData(formRef.current, { format: 'object' })

      fetchHook('auth/login', {
        method: 'POST',
        body: formData,
      })
        .then(res => {
          setAppContext('authenticated', true)
          setAppContext('avatar_idx', res.avatar_idx)
          setAppContext('user_id', res.user_id)
          setNotification('show', false)

          if (searchParams.get('from')) navigate(decodeURIComponent(searchParams.get('from')), { replace: true })
          else navigate('/', { replace: true })
        })
        .catch(err => {
          setAllNotification({
            show: true,
            title: 'Login failed',
            description: err.message,
            status: 'error',
          })
        })
        .finally(() => setLoading(false))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formRef]
  )

  return (
    <main className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Login</title>
      </Helmet>

      <form ref={formRef} className='space-y-6' onSubmit={signIn}>
        <BaseInput id='email' name='email' type='email' autoComplete='email' required label='Email address' />

        <BaseInput
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          label='Password'
        />

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

        <CsrfField />

        <div>
          <BaseButton type='submit' stretch loading={loading}>
            Login
          </BaseButton>
        </div>

        <div className='flex items-center'>
          <div className='text-sm'>
            <span className='text-gray-100'>Don&apos;t have an account?</span>{' '}
            <Link to={{ pathname: '/auth/register', search: searchParams.toString() }}>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>Sign up</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}
Component.displayName = 'LoginPage'
