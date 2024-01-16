import { memo, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { classNames } from '@arpansaha13/utils'
import BaseButton from '~base/BaseButton'
import BaseButtonLink from '~base/BaseButtonLink'
import OtpInput from '~/components/Auth/OtpInput'
import { getVerificationLinkValidity } from '~loaders/auth.loader'
import {
  useResendOtpCoolDownController,
  useVerificationController,
  useOtpFormController,
} from './verification.controller'
import type { OtpFormProps, ResendOtpCoolDownProps } from './verification.types'

export const loader = getVerificationLinkValidity

export function Component() {
  const { linkIsValid, verified, setVerified } = useVerificationController()

  const content = useMemo(() => {
    if (!linkIsValid) return <LinkExpired />

    if (verified) return <VerifiedInfo />

    return <OtpForm setVerified={setVerified} />
  }, [linkIsValid, verified, setVerified])

  return (
    <main className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Verification</title>
      </Helmet>

      {content}
    </main>
  )
}

Component.displayName = 'Verification'

function OtpForm(props: Readonly<OtpFormProps>) {
  const { coolDownIsActive, otpValue, loading, resendOTP, verifyOTP, onCoolDownEnd, setOtpValue } =
    useOtpFormController(props)

  return (
    <form className='space-y-6' onSubmit={verifyOTP}>
      <OtpInput length={4} label='Enter OTP' value={otpValue} setValue={setOtpValue} />

      <div className='flex items-center justify-between gap-3 text-sm'>
        <button
          type='button'
          className={classNames('block font-medium text-amber-600', coolDownIsActive ? '' : 'hover:text-amber-500')}
          disabled={coolDownIsActive}
          onClick={resendOTP}
        >
          Resend OTP
        </button>
        {coolDownIsActive && <ResendOtpCoolDown onCoolDownEnd={onCoolDownEnd} />}
      </div>

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

      <BaseButtonLink to='/auth/resend-verification-link'>Request verification</BaseButtonLink>
    </div>
  )
}

const ResendOtpCoolDown = memo((props: Readonly<ResendOtpCoolDownProps>) => {
  const { count } = useResendOtpCoolDownController(props)

  return (
    <p className='text-gray-400 text-xs'>
      Resend again in <span>{count}</span> seconds
    </p>
  )
})
