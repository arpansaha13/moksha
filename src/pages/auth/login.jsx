import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import { useAppContext } from '../../containers/DataProvider'
import { useAuthContext } from '../../containers/AuthProvider'

const LoginPage = () => {
  const { setAppContext } = useAppContext()
  const { setNotification, setAllNotification } = useAuthContext()
  const navigate = useNavigate()

  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  const [formData, { set }] = useMap({
    email: '',
    password: '',
  })

  const signIn = useCallback(e => {
    e.preventDefault()
    setLoading(true)

    fetchHook('users/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then(() => {
      setLoading(false)
      setAppContext('authenticated', true)
      setNotification('show', false)

      fetchHook('users/particular').then(res => {
        setAppContext('authUser', res.payload)
        navigate('/')
      })
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
  }, [formData])

  return (
    <main className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Login</title>
      </Helmet>

      <form className="space-y-6" onSubmit={signIn}>
        <BaseInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email address"
          value={formData.email}
          onChange={e => set('email', e.target.value)}
        />

        <BaseInput
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          label="Password"
          value={formData.password}
          onChange={e => set('password', e.target.value)}
        />

        <div className="text-sm flex items-center justify-between">
          <div>
            <Link to="/auth/forgot-password">
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>
                Forgot your password?
              </span>
            </Link>
          </div>
        </div>

        <div>
          <BaseButton type="submit" stretch loading={loading}>
            Login
          </BaseButton>
        </div>

        <div className="flex items-center">
          <div className="text-sm">
            <span className="text-gray-100">Don&apos;t have an account?</span>{' '}
            <Link to="/auth/register">
              <span className="font-medium text-amber-600 hover:text-amber-500 cursor-pointer">Sign up</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}
export default LoginPage
