import { lazy } from 'react'
import { Link } from 'react-router-dom'
import accountMultipleIcon from '@iconify-icons/mdi/account-multiple-remove-outline'
import { isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import Loader from '~common/Loader'
import EmptyState from '~common/EmptyState'
import type { TeamRegistrationProps } from './team-registration.types'
import { useTeamRegistrationController } from './team-registration.controller'

const Register = lazy(() => import('./TeamRegister'))
const Registered = lazy(() => import('./Registered'))

export default function TeamRegistration(props: TeamRegistrationProps) {
  const { contest } = props

  const { loading, createdTeam, teamMembers, registration, alreadyRegisteredMemberIds, setRegistration } =
    useTeamRegistrationController(props)

  if (loading) {
    return <Loader className='w-6 mx-auto' />
  }

  if (createdTeam === null) {
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
