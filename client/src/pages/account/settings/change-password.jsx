import nprogress from 'nprogress'
import { useMap } from '~/hooks/common/useMap'
import { useFetch } from '~/hooks/common/useFetch'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import CsrfField from '~common/CsrfField'
import Notification from '~common/Notification'
import { useRef, useState } from 'react'
import getFormData from '~/utils/getFormData'

export const loader = () => {
  nprogress.done()
  return null
}

export function Component() {
  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [notification, { set, setAll }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  const [validationErrors, { set: setError }] = useMap({
    old_password: null,
    new_password: null,
    confirm_password: null,
  })

  function changePassword(e) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current)

    if (formData.new_password !== formData.confirm_password) {
      setError('new_password', 'Password and confirm-password do not match')
      setError('confirm_password', 'Password and confirm-password do not match')
      setLoading(false)
      return
    } else if (validationErrors.new_password) {
      setError('new_password', null)
      setError('confirm_password', null)
    }

    fetchHook('auth/change-password', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        setAll({
          show: true,
          title: 'Password updated!',
          description: res.message,
          status: 'success',
        })
      })
      .catch(err => {
        setAll({
          show: true,
          title: 'Failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <main>
      <Notification
        show={notification.show}
        setShow={bool => set('show', bool)}
        status={notification.status}
        title={notification.title}
        description={notification.description}
        timeout={5}
        className='top-16'
      />

      <h2 className='text-2xl font-bold text-gray-50'>Change Password</h2>

      <Sheet className='mt-4 p-4 sm:p-6'>
        <form ref={formRef} onSubmit={changePassword} className='max-w-sm space-y-6'>
          <BaseInput
            id='old-password'
            name='old_password'
            type='password'
            required
            label='Old password'
            validationError={validationErrors['old_password']}
          />

          <BaseInput
            id='new-password'
            name='new_password'
            type='password'
            required
            minLength={8}
            maxLength={30}
            label='New password'
            validationError={validationErrors['new_password']}
          />

          <BaseInput
            id='confirm_password'
            name='confirm_password'
            type='password'
            required
            label='Confirm password'
            validationError={validationErrors['confirm_password']}
          />

          <CsrfField />

          <BaseButton type='submit' loading={loading}>
            Change password
          </BaseButton>
        </form>
      </Sheet>
    </main>
  )
}
Component.displayName = 'ChangePassword'
