import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useOutletContext, useLoaderData } from 'react-router-dom'
import { classNames } from '@arpansaha13/utils'
import { useMap } from '~/hooks/useMap'
import { useFetch } from '~/hooks/useFetch'
import BaseButton from '~base/BaseButton'
import BaseButtonLink from '~base/BaseButtonLink'
import OtpInput from '~common/OtpInput'
import CsrfField from '~common/CsrfField'
import { getVerificationLinkValidity } from '~loaders/auth.loader'

export const loader = getVerificationLinkValidity

export function Component() {
  const linkIsValid = useLoaderData()
  const [verified, setVerified] = useState(false)

  const content = useMemo(() => {
    if (!linkIsValid) return <LinkExpired />

    if (verified) return <VerifiedInfo />

    return <OtpForm setVerified={setVerified} />
  }, [linkIsValid, verified])

  return (
    <main className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Verification</title>
      </Helmet>

      {content}
    </main>
  )
}

Component.displayName = 'VerificationPage'

function OtpForm({ setVerified }) {
  const params = useParams()
  const { setNotification, setAllNotification } = useOutletContext()

  const fetchHook = useFetch()

  const [loading, setLoading] = useState(false)
  const [cooldownIsActive, setCooldown] = useState(false)

  const [formData, { set }] = useMap({
    otp: '',
  })

  function verifyOTP(e) {
    e.preventDefault()
    setLoading(true)

    fetchHook(`auth/verification/${params.hash}`, {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(() => {
        setVerified(true)
        setNotification('show', false)
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Validation failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  }

  function resendOTP() {
    setCooldown(true)

    fetchHook(`auth/resend-otp/${params.hash}`)
      .then(() => {
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
    <form className='space-y-6' onSubmit={verifyOTP}>
      <OtpInput length={4} label='Enter OTP' value={formData.otp} setValue={value => set('otp', value)} />

      <div className='flex items-center justify-between gap-3 text-sm'>
        <button
          type='button'
          className={classNames('block font-medium text-amber-600', cooldownIsActive ? '' : 'hover:text-amber-500')}
          disabled={cooldownIsActive}
          onClick={resendOTP}
        >
          Resend OTP
        </button>
        {cooldownIsActive && <ResendOtpCooldown onCooldownEnd={setCooldown.bind(false)} />}
      </div>

      <CsrfField />

      <div>
        <BaseButton type='submit' stretch loading={loading}>
          Verify OTP
        </BaseButton>
      </div>
    </form>
  )
}

function VerifiedInfo() {
  return (
    <div className='text-center'>
      <p className='mb-4 text-2xl font-bold'>Verification successful!</p>
      <p className='mb-4 text-sm text-gray-400'>Your account has been verified. You can now login from your account.</p>

      <BaseButtonLink to='/auth/login'>Go to login</BaseButtonLink>
    </div>
  )
}

function LinkExpired() {
  return (
    <div className='text-center'>
      <p className='mb-4 text-2xl font-bold'>This link has expired</p>
      <p className='mb-4 text-sm text-gray-400'>You can still request a new account verification link.</p>

      <BaseButtonLink to='/auth/resend-link'>Request verification</BaseButtonLink>
    </div>
  )
}

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <p className='text-gray-400 text-xs'>
      Resend again in <span>{count}</span> seconds
    </p>
  )
})
