import { useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useOutletContext, useLoaderData } from 'react-router-dom'
import { useMap } from '~/hooks/useMap'
import { useFetch } from '~/hooks/useFetch'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import BaseButtonLink from '~base/BaseButtonLink'
import CsrfField from '~common/CsrfField'
import getFormData from '~/utils/getFormData'
import { getForgotPassLinkValidity } from '~loaders/auth.loader'

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

Component.displayName = 'VerificationPage'

function ResetPassForm({ setPassIsReset }) {
  const params = useParams()
  const { setNotification, setAllNotification } = useOutletContext()

  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [validationErrors, { set: setError }] = useMap({
    password: null,
    confirm_password: null,
  })

  function resetPass(e) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current)

    if (formData.password !== formData.confirm_password) {
      setError('password', 'Password and confirm-password do not match')
      setError('confirm_password', 'Password and confirm-password do not match')
      setLoading(false)
      return
    } else if (validationErrors.password) {
      setError('password', null)
      setError('confirm_password', null)
    }

    fetchHook(`auth/reset-password/${params.hash}`, {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        setPassIsReset(true)
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

  return (
    <form ref={formRef} className='space-y-6' onSubmit={resetPass}>
      <BaseInput
        id='password'
        name='password'
        type='password'
        autoComplete='current-password'
        required
        label='Password'
        validationError={validationErrors['password']}
      />

      <BaseInput
        id='confirm_password'
        name='confirm_password'
        type='password'
        autoComplete='current-password'
        required
        label='Confirm password'
        validationError={validationErrors['confirm_password']}
      />

      <CsrfField />

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
