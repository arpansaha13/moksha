import { Link } from 'react-router-dom'
import { isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import BaseButton from '~base/BaseButton'
import BaseInput from '~base/BaseInput'
import Notification from '~common/Notification'
import { allowIfNoTeamCreated } from '~loaders/teams.loader'
import { useCreateTeamController, useCreateTeamFormController } from './create-team.controller'
import type { CreateTeamFormProps } from './create-team.types'

export const loader = allowIfNoTeamCreated

export function Component() {
  const { createdTeam, notification, setShowNotification, setAllNotification } = useCreateTeamController()

  return (
    <main className='max-w-xl mx-auto h-cover flex flex-col justify-center relative'>
      <Notification
        show={notification.show}
        setShow={setShowNotification}
        status={notification.status}
        title={notification.title}
        description={notification.description}
        className='top-16'
      />

      <div className='markdown markdown-a'>
        <h1 className='text-center sm:text-left'>Create team</h1>

        <Sheet className='py-4 p-4 sm:p-6'>
          {!isNullOrUndefined(createdTeam) ? (
            <>
              <h2>Cannot create another team</h2>

              <p>
                One user can create and be the leader of <strong>only one team</strong>.
              </p>

              <p>
                You have already created a team{' '}
                <Link to={`/teams/${createdTeam.team_id}`}>{createdTeam.team_name}</Link>.
              </p>
            </>
          ) : (
            <CreateTeamForm setShowNotification={setShowNotification} setAllNotification={setAllNotification} />
          )}
        </Sheet>
      </div>
    </main>
  )
}

Component.displayName = 'CreateTeam'

function CreateTeamForm(props: CreateTeamFormProps) {
  const { loading, createTeam, formRegister } = useCreateTeamFormController(props)

  return (
    <form onSubmit={createTeam}>
      <p>Creating a team is as simple as choosing a name and pressing the button.</p>

      <p>One user can create and be the leader of only one team.</p>

      <div className='not-prose mt-6'>
        <BaseInput id='team_name' type='text' label='Team name' required {...formRegister('team_name')} />
      </div>

      <div className='mt-6 flex flex-col sm:flex-row sm:justify-end gap-4'>
        <BaseButton loading={loading} type='submit'>
          Create team
        </BaseButton>
      </div>
    </form>
  )
}
