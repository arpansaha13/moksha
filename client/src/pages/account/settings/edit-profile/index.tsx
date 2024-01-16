import BaseInput from '~base/BaseInput'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import Notification from '~common/Notification'
import { getAuthUserData } from '~/router/loaders/auth.loader'
import { useEditProfileController } from './edit-profile.controller'

export const loader = getAuthUserData

export function Component() {
  const { loading, isDirty, notification, formRegister, editProfile, setShowNotification } = useEditProfileController()

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
        <form className='max-w-sm space-y-6' onSubmit={editProfile}>
          <BaseInput
            id='first-name'
            type='text'
            autoComplete='given-name'
            autoCapitalize='words'
            maxLength={20}
            required={true}
            label='First name'
            {...formRegister('first_name')}
          />

          <BaseInput
            id='last-name'
            type='text'
            autoComplete='family-name'
            autoCapitalize='words'
            maxLength={20}
            required={true}
            label='Last name'
            {...formRegister('last_name')}
          />

          <BaseInput
            id='institution'
            type='text'
            autoComplete='organization'
            autoCapitalize='words'
            required={true}
            minLength={3}
            maxLength={50}
            label='Institution'
            {...formRegister('institution')}
          />

          <BaseInput
            id='phone'
            type='tel'
            autoComplete='tel'
            inputMode='numeric'
            required={true}
            label='Phone number'
            pattern='^[0-9]+$'
            title='This field should contain only digits'
            minLength={10}
            maxLength={10}
            {...formRegister('phone_no')}
          />

          <div>
            <BaseButton disabled={!isDirty} type='submit' loading={loading}>
              Save
            </BaseButton>
          </div>
        </form>
      </Sheet>
    </main>
  )
}

Component.displayName = 'EditProfile'
