import nprogress from 'nprogress'
import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import CsrfField from '~common/CsrfField'
import Notification from '~common/Notification'
import { useChangePasswordController } from './change-password.controller'

export const loader = () => {
  nprogress.done()
  return null
}

export function Component() {
  const { formRef, loading, notification, validationErrors, changePassword, setShowNotification } =
    useChangePasswordController()

  return (
    <main>
      <Notification
        show={notification.show}
        setShow={setShowNotification}
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
