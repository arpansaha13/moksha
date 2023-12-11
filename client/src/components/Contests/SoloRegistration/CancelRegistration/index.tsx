import { Link } from 'react-router-dom'
import BaseButton from '~base/BaseButton'
import { useCancelRegistrationController } from './cancel-registration.controller'
import type { CancelRegistrationProps } from './cancel-registration.types'

export default function CancelRegistration(props: CancelRegistrationProps) {
  const { loading, cancelRegistration } = useCancelRegistrationController(props)

  return (
    <div>
      <p>
        Your registration has been recorded. You can see all your contest registrations{' '}
        <Link to='/account/registrations'>here</Link>.
      </p>

      <div className='not-prose'>
        <BaseButton secondary loading={loading} onClick={cancelRegistration}>
          Cancel registration
        </BaseButton>
      </div>
    </div>
  )
}
