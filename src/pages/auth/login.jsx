import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import BaseInput from '../../components/base/BaseInput'
import AuthLayout from '../../layouts/auth'
import { STORAGE_AUTH_KEY } from '../../constants'
import { useAppContext } from '../../containers/DataProvider'

const LoginPage = () => {
  const [token, setAuthToken] = useLocalStorage(STORAGE_AUTH_KEY)
  const { setAppContext } = useAppContext()
  const navigate = useNavigate()

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
      if (res.message === "User logged in!!") {
        // TODO: replace with user data from designated api
        setAppContext(state => {
          const newState = { ...state }
          newState.authUser = { ...state.authUser, ...formData }
          return newState
        })
        navigate('/')
      }
    })
    .catch(err => {
      // Failed
    })
  }

  return (
    <div className='max-w-md px-4 sm:px-0'>
      {/* <Head>
        <title>Moksha | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

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

        {/* <div className="flex items-center justify-end">
          <div className="text-sm">
            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
              Forgot your password?
            </a>
          </div>
        </div> */}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-amber-700 hover:bg-amber-800 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2 transition-colors"
          >
            Login
          </button>
        </div>

        <div className="flex items-center justify-start">
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
LoginPage.getLayout = (page) => <AuthLayout heading="Login to your account">{page}</AuthLayout>
export default LoginPage
