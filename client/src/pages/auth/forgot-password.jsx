import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useOutletContext } from 'react-router-dom'
import { useFetch } from '~/hooks/common/useFetch'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import CsrfField from '~common/CsrfField'
import getFormData from '~/utils/getFormData'

export function Component() {
  const fetchHook = useFetch()
  const { setAllNotification } = useOutletContext()

  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  function forgotPassword(e) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current)

    fetchHook('auth/forgot-password', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        setAllNotification({
          show: true,
          title: 'Email sent',
          description: res.message,
          status: 'success',
        })
      })
      .catch(err => {
        setAllNotification({
          show: true,
          title: 'Failure',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className='max-w-md px-4 sm:px-0'>
      <Helmet>
        <title>Moksha | Forgot password</title>
      </Helmet>

      <form ref={formRef} className='space-y-6' onSubmit={forgotPassword}>
        <BaseInput id='email' name='email' type='email' autoComplete='email' required label='Email address' />

        <CsrfField />

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
