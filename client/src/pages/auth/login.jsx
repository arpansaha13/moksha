import { useCallback, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import CsrfField from '../../components/common/CsrfField'
import { useAppContext } from '../../containers/DataProvider'
import { useAuthContext } from '../../containers/AuthProvider'
import getFormData from '../../utils/getFormData'

const LoginPage = () => {
  const { setAppContext } = useAppContext()
  const { setNotification, setAllNotification } = useAuthContext()

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
        body: JSON.stringify(formData),
      })
        .then(res => {
          setLoading(false)
          setAppContext('authenticated', true)
          setAppContext('avatar_idx', res.avatar_idx)
          setAppContext('user_id', res.user_id)
          setNotification('show', false)

          if (searchParams.get('from')) navigate(decodeURIComponent(searchParams.get('from')), { replace: true })
          else navigate('/', { replace: true })
        })
        .catch(err => {
          setLoading(false)
          setAllNotification({
            show: true,
            title: 'Login failed',
            description: err.message,
            status: 'error',
          })
        })
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

        {/* TODO */}
        {/* <div className='text-sm flex items-center justify-between'>
          <div>
            <Link to='/auth/forgot-password'>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>
                Forgot your password?
              </span>
            </Link>
          </div>
        </div> */}

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
export default LoginPage
