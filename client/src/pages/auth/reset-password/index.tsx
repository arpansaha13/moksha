import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLoaderData } from 'react-router-dom'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import BaseButtonLink from '~base/BaseButtonLink'
import { getForgotPassLinkValidity } from '~loaders/auth.loader'
import { useResetPasswordController } from './reset-password.controller'
import type { ResetPassFormProps } from './reset-password.types'

export const loader = getForgotPassLinkValidity

export function Component() {
  const linkIsValid = useLoaderData()
  const [passIsReset, setPassIsReset] = useState(false)

  const content = useMemo(() => {
    if (!linkIsValid) return <LinkExpired />

    if (passIsReset) return <SuccessInfo />

    return <ResetPassForm setPassIsReset={setPassIsReset} />
  }, [linkIsValid, passIsReset])

  return (
    <main className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Reset Password</title>
      </Helmet>

      {content}
    </main>
  )
}

Component.displayName = 'Verification'

function ResetPassForm(props: ResetPassFormProps) {
  const { loading, validationErrors, formRegister, resetPass } = useResetPasswordController(props)

  return (
    <form className='space-y-6' onSubmit={resetPass}>
      <BaseInput
        id='password'
        type='password'
        autoComplete='current-password'
        required
        label='Password'
        validationError={validationErrors.password?.message}
        {...formRegister('password')}
      />

      <BaseInput
        id='confirm_password'
        type='password'
        autoComplete='current-password'
        required
        label='Confirm password'
        validationError={validationErrors.confirm_password?.message}
        {...formRegister('confirm_password')}
      />

      <div>
        <BaseButton type='submit' stretch loading={loading}>
          Submit
        </BaseButton>
      </div>
    </form>
  )
}

function SuccessInfo() {
  return (
    <div className='text-center'>
      <p className='mb-4 text-2xl font-bold'>Password reset successfully!</p>
      <p className='mb-4 text-sm text-gray-400'>
        Your password has been reset. You can now login from your account with your new password.
      </p>

      <BaseButtonLink to='/auth/login'>Go to login</BaseButtonLink>
    </div>
  )
}

function LinkExpired() {
  return (
    <div className='text-center'>
      <p className='mb-4 text-2xl font-bold'>This link has expired</p>
      <p className='mb-4 text-sm text-gray-400'>You can initiate a new password-reset request.</p>

      <BaseButtonLink to='/auth/forgot-password'>Request a new link</BaseButtonLink>
    </div>
  )
}
