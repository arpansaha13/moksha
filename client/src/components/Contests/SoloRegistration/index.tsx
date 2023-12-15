import { lazy, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import type { SoloContest } from '~/types'

interface SoloRegistrationProps {
  contest: SoloContest
  registrationId?: number
}

const SoloRegister = lazy(() => import('./SoloRegister'))
const CancelRegistration = lazy(() => import('./CancelRegistration'))

const SoloRegistration = (props: Readonly<SoloRegistrationProps>) => {
  const { contest, registrationId: initialRegistrationId } = props
  const [registrationId, setRegistrationId] = useState(initialRegistrationId ?? null)

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
