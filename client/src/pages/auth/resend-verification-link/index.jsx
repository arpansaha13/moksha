import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import { useResendVerificationLinkController } from './resend-verification-link.controller'

export function Component() {
  const { formRef, loading, resendLink } = useResendVerificationLinkController()

  return (
    <div className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Forgot password</title>
      </Helmet>

      <form ref={formRef} className='space-y-6' onSubmit={resendLink}>
        <BaseInput id='email' name='email' type='email' autoComplete='email' required label='Email address' />

        <div>
          <BaseButton type='submit' stretch loading={loading}>
            Submit
          </BaseButton>
        </div>

        <div className='flex items-center'>
          <div className='text-sm'>
            <Link to='/auth/login'>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>Back to Login</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

Component.displayName = 'ForgotPasswordPage'