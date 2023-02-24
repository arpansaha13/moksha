import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import Notification from '../../components/common/Notification'
import { STORAGE_AUTH_KEY } from '../../constants'
import { useAppContext } from '../../containers/DataProvider'

const LoginPage = () => {
  const [token, setAuthToken] = useLocalStorage(STORAGE_AUTH_KEY)
  const { setAppContext } = useAppContext()
  const navigate = useNavigate()

  const [notification, { set: setNotification, setAll: setAllNotification }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  useEffect(() => {
    if (token) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchHook = useFetch()

  const [formData, { set }] = useMap({
    email: '',
    password: '',
  })

  function signIn(e) {
    e.preventDefault()

    fetchHook('users/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then((res) => {
      setAppContext(state => {
        const newState = { ...state }
        newState.authUser = res.user
        return newState
      })
      navigate('/')
    })
    .catch(err => {
      setAllNotification({
        show: true,
        title: 'Login failed',
        description: err.message,
        status: 'error',
      })
    })
  }

  return (
    <div className='max-w-md px-4 sm:px-0'>
      <Notification
        show={notification.show}
        setShow={bool => setNotification('show', bool)}
        status={ notification.status }
        title={ notification.title }
        description={ notification.description }
      />

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

          <div>
            <Link to="/auth/verification" state={{ prevPath: '/auth/login' }}>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>
                Verify your account
              </span>
            </Link>
          </div>
        </div>

        <div>
          <BaseButton type="submit" stretch>
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
    </div>
  )
}
export default LoginPage
