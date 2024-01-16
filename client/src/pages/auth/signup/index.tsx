import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import { useSignUpController } from './signup.controller'

export function Component() {
  const { fields, loading, searchParams, signUp } = useSignUpController()

  return (
    <main className='sm:max-w-2xl px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Sign up</title>
      </Helmet>

      <form className='space-y-6' onSubmit={signUp}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6'>
          {fields.map(field => (
            <BaseInput key={field.id} {...field} />
          ))}
        </div>

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

        <div>
          <BaseButton type='submit' stretch loading={loading}>
            Sign up
          </BaseButton>
        </div>

        <div className='flex items-center'>
          <div className='text-sm'>
            <span className='text-gray-100'>Already have an account?</span>{' '}
            <Link to={{ pathname: '/auth/login', search: searchParams.toString() }}>
              <span className='font-medium text-amber-600 hover:text-amber-500 cursor-pointer'>Login</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}

Component.displayName = 'SignUp'
