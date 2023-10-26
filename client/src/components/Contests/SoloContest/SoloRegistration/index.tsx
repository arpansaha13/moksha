import { lazy } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import Loader from '~common/Loader'
import { useSoloRegistrationController } from './solo-registration.controller'
import type { SoloRegistrationProps } from './solo-registration.types'

const SoloRegister = lazy(() => import('./SoloRegister'))
const CancelRegistration = lazy(() => import('./CancelRegistration'))

const SoloRegistration = (props: SoloRegistrationProps) => {
  const { contest } = props
  const { loading, registrationId, setRegistrationId } = useSoloRegistrationController(props)

  if (loading) {
    return <Loader className='w-6 mx-auto' />
  }

  return new Date() > contest.deadline ? (
    <div>Registration for this contest is closed.</div>
  ) : (
    <div className='markdown markdown-a space-x-4'>
      {isNullOrUndefined(registrationId) ? (
        <SoloRegister contestId={contest.id} setRegistrationId={setRegistrationId} />
      ) : (
        <CancelRegistration registrationId={registrationId} setRegistrationId={setRegistrationId} />
      )}
    </div>
  )
}

export default SoloRegistration
