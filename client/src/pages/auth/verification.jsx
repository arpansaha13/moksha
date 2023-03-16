import { memo, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import BaseButton from '../../components/base/BaseButton'
import OtpInput from '../../components/common/OtpInput'
import { useAppContext } from '../../containers/DataProvider'
import { useAuthContext } from '../../containers/AuthProvider'
import classNames from '../../utils/classNames'

const VerificationPage = () => {
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const {setAppContext} = useAppContext()
  const { setNotification, setAllNotification } = useAuthContext()

  const fetchHook = useFetch()

  const [loading, setLoading] = useState(false)
  const [cooldownIsActive, setCooldown] = useState(false)

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
      setNotification('show', false)
      navigate({pathname: '/auth/login', search: searchParams.toString()})
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
    setCooldown(true)

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

      <form className="space-y-6" onSubmit={verifyOTP}>
        <OtpInput
          length={4}
          label="Enter OTP"
          value={formData.otp}
          setValue={value => set('otp', value)}
        />

        <div className="flex items-center justify-between gap-3 text-sm">
          <button
            type="button"
            className={classNames(
              "block font-medium text-amber-600",
              cooldownIsActive ? '' : 'hover:text-amber-500'
            )}
            disabled={cooldownIsActive}
            onClick={resendOTP}
          >
            Resend OTP
          </button>
          { cooldownIsActive && <ResendOtpCooldown onCooldownEnd={setCooldown.bind(false)} /> }
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

const ResendOtpCooldown = memo(({ onCooldownEnd }) => {
  const [count, setCount] = useState(30)
  const timeoutId = useRef(null)

  useEffect(() => {
    timeoutId.current = setInterval(() => {
      setCount(state => {
        if (state === 1) {
          clearInterval(timeoutId.current)
          onCooldownEnd()
          return state
        }
        return state - 1
      })
    }, 1000)
  }, [])

  return (
    <p className="text-gray-400 text-xs">
      Resend again in {' '}
      <span>{ count }</span>
      {' '} seconds
    </p>
  )
})
