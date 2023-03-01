import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import OtpInput from '../../components/common/OtpInput'
import AuthLayout from '../../layouts/auth'
import Notification from '../../components/common/Notification'
import { STORAGE_AUTH_KEY } from '../../constants'
import { useAppContext } from '../../containers/DataProvider'
import { useAuthContext } from '../../containers/AuthProvider'

const VerificationPage = () => {
  const navigate = useNavigate()
  const [token, setAuthToken] = useLocalStorage(STORAGE_AUTH_KEY)
  const {setAppContext} = useAppContext()
  const {authContext} = useAuthContext()
  const location = useLocation()

  useEffect(() => {
    if (token) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchHook = useFetch()

  const [notification, { set: setNotification, setAll: setAllNotification }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  const [formData, { set }] = useMap({
    email: authContext.email,
    otp: '',
  })

  function verifyOTP(e) {
    e.preventDefault()

    fetchHook('users/otp', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then(() => {
      // TODO: replace with user data from designated api
      setAppContext(state => {
        const newState = { ...state }
        newState.authUser = { ...state.authUser, ...authContext }
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

  function resendOTP() {
    fetchHook('users/resendotp', {
      method: 'POST',
      body: JSON.stringify({email: formData.email}),
    })
  }

  return (
    <div className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Verification</title>
      </Helmet>

      <Notification
        show={notification.show}
        setShow={bool => setNotification('show', bool)}
        status={ notification.status }
        title={ notification.title }
        description={ notification.description }
      />

      <form className="space-y-6" onSubmit={verifyOTP}>
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

        <OtpInput
          length={4}
          label="Enter OTP"
          value={formData.otp}
          setValue={value => set('otp', value)}
        />

        <div className="flex items-center">
          <div className="text-sm">
            <button type="button" className="font-medium text-amber-600 hover:text-amber-500" onClick={resendOTP}>
              Resend OTP
            </button>
          </div>
        </div>

        <div>
          <BaseButton type="submit" stretch>
            Verify OTP
          </BaseButton>
        </div>

        {
          // Show this link only if previous route was the Login page
          location.state?.prevPath === '/auth/login' &&
          <div className="flex items-center">
            <div className="text-sm">
              <Link to="/auth/login">
                <span className="font-medium text-amber-600 hover:text-amber-500 cursor-pointer">Back to Login</span>
              </Link>
            </div>
          </div>
        }
      </form>
    </div>
  )
}
VerificationPage.getLayout = (page) => <AuthLayout heading="Verify your account">{page}</AuthLayout>
export default VerificationPage
