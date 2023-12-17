import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import RegisteredContestMembers from '~/components/Teams/RegisteredContestMembers'
import { useRegisteredController } from './registered.controller'
import type { RegisteredProps } from './registered.types'

export default function Registered(props: RegisteredProps) {
  const { team, registration } = props
  const { loading, cancelRegistration } = useRegisteredController(props)

  return (
    <Sheet className='p-4 sm:p-6 markdown'>
      <h2>Registered with {team.team_name}</h2>

      <h3>Participating members</h3>

      <div className='not-prose'>
        <RegisteredContestMembers members={registration.registered_members} />
      </div>

      <form className='mt-3 ml-auto w-max' onSubmit={cancelRegistration}>
        <BaseButton type='submit' secondary loading={loading}>
          Cancel registration
        </BaseButton>
      </form>
    </Sheet>
  )
}
