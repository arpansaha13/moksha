import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import CsrfField from '~common/CsrfField'
import Notification from '~common/Notification'
import { getAuthUserData } from '~/router/loaders/auth.loader'
import { useEditProfileController } from './edit-profile.controller'

export const loader = getAuthUserData

export function Component() {
  const { formRef, loading, disabled, notification, fields, editProfile, setShowNotification } =
    useEditProfileController()

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

      <h2 className='mb-4 text-2xl font-bold text-gray-50'>Edit profile</h2>

      <Sheet className='mt-4 p-4 sm:p-6'>
        <form ref={formRef} className='max-w-sm space-y-6' onSubmit={editProfile}>
          {fields.map(field => (
            <BaseInput key={field.id} {...field} />
          ))}

          <CsrfField />

          <div>
            <BaseButton disabled={disabled} type='submit' loading={loading}>
              Save
            </BaseButton>
          </div>
        </form>
      </Sheet>
    </main>
  )
}

Component.displayName = 'EditProfile'
