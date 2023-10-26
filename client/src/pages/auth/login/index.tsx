import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import CsrfField from '~common/CsrfField'
import { useLoginController } from './login.controller'

export function Component() {
  const { formRef, loading, searchParams, signIn } = useLoginController()

  return (
    <main className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Login</title>
      </Helmet>

      <form ref={formRef} className='space-y-6' onSubmit={signIn}>
        <BaseInput id='email' name='email' type='email' autoComplete='email' required label='Email address' />

        <BaseInput
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          label='Password'
        />

        <div className='text-sm 2xs:flex 2xs:items-center 2xs:justify-between space-y-3 2xs:space-y-0'>
          <div>
            <Link to='/auth/forgot-password'>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>
                Forgot <span className='hidden xs:inline'>your</span> password?
              </span>
            </Link>
          </div>

          <div>
            <Link to='/auth/resend-verification-link'>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>
                Resend verification link
              </span>
            </Link>
          </div>
        </div>

        <CsrfField />

        <div>
          <BaseButton type='submit' stretch loading={loading}>
            Login
          </BaseButton>
        </div>

        <div className='flex items-center'>
          <div className='text-sm'>
            <span className='text-gray-100'>Don&apos;t have an account?</span>{' '}
            <Link to={{ pathname: '/auth/register', search: searchParams.toString() }}>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>Sign up</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}

Component.displayName = 'Login'