import { lazy, useState } from 'react'
import { Link } from 'react-router-dom'
import accountMultipleIcon from '@iconify-icons/mdi/account-multiple-remove-outline'
import { isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import EmptyState from '~common/EmptyState'
import type { Team, TeamContest, User } from '~/types'

export interface TeamRegistrationProps {
  contest: TeamContest
  createdTeam?: Team
  registration: any
  teamMembers: User[]
  alreadyRegisteredMemberIds: Set<User['id']>
}

const Register = lazy(() => import('./TeamRegister'))
const Registered = lazy(() => import('./Registered'))

export default function TeamRegistration(props: Readonly<TeamRegistrationProps>) {
  const { contest, createdTeam, registration: initialRegistration, teamMembers, alreadyRegisteredMemberIds } = props

  const [registration, setRegistration] = useState(initialRegistration)

  if (isNullOrUndefined(createdTeam)) {
    return (
      <>
        <EmptyState icon={accountMultipleIcon} title='You are not the leader of any team' />

        <div className='mt-1 mx-auto max-w-xs sm:max-w-sm text-center text-sm text-gray-400 space-y-1'>
          <p className=''>Only the leader can register in a team contest on behalf of the team.</p>
          <p>
            You can create a team{' '}
            <Link to='/teams/create' className='text-amber-600 hover:text-amber-500 font-medium transition-colors'>
              here
            </Link>
            .
          </p>
        </div>
      </>
    )
  }

  if (!isNullOrUndefined(registration)) {
    return (
      <Registered
        contestId={contest.id}
        team={createdTeam}
        registration={registration}
        setRegistration={setRegistration}
      />
    )
  }

  if (new Date() > contest.deadline) {
    return <Sheet className='p-4 sm:p-6'>Registration for this contest is closed.</Sheet>
  }

  return (
    <Register
      contest={contest}
      team={createdTeam}
      members={teamMembers}
      alreadyRegisteredMemberIds={alreadyRegisteredMemberIds}
      setRegistration={setRegistration}
    />
  )
}
