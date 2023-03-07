import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import BaseButton from '../../components/base/BaseButton'
import OtpInput from '../../components/common/OtpInput'
import Notification from '../../components/common/Notification'
import { useAppContext } from '../../containers/DataProvider'

const VerificationPage = () => {
  const navigate = useNavigate()
  const {setAppContext} = useAppContext()

  const fetchHook = useFetch()

  const [notification, { set: setNotification, setAll: setAllNotification }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  const setShowNotification = useCallback(bool => setNotification('show', bool), [])

  const [loading, setLoading] = useState(false)

  const [formData, { set }] = useMap({
    otp: '',
  })

  function verifyOTP(e) {
    e.preventDefault()
    setLoading(true)

    fetchHook('users/otp', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then(() => {
      setLoading(false)
      setAppContext('authenticated', true)
      setShowNotification(false)
      navigate('/auth/login')
    })
    .catch(err => {
      setLoading(false)
      setAllNotification({
        show: true,
        title: 'Validation failed',
        description: err.message,
        status: 'error',
      })
    })
  }

  function resendOTP() {
    fetchHook('users/resendotp').then(() => {
      setAllNotification({
        show: true,
        title: 'OTP sent',
        description: 'The OTP has been sent to your email', // TODO: Mention email id here from backend
        status: 'success',
      })
    })
    .catch(() => {
      setAllNotification({
        show: true,
        title: 'Failed to resend OTP',
        description: 'Please try to register for a new account again.',
        status: 'error',
      })
    })
  }

  return (
    <main className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Verification</title>
      </Helmet>

      <Notification
        show={notification.show}
        setShow={setShowNotification}
        status={ notification.status }
        title={ notification.title }
        description={ notification.description }
      />

      <form className="space-y-6" onSubmit={verifyOTP}>
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
          <BaseButton type="submit" stretch loading={loading}>
            Verify OTP
          </BaseButton>
        </div>
      </form>
    </main>
  )
}
export default VerificationPage
