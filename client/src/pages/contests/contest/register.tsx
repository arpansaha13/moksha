import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { useStore } from '~/store'
import Sheet from '~common/Sheet'
import EmptyState from '~common/EmptyState'
import SoloRegistration from '~/components/Contests/SoloRegistration'
import TeamRegistration from '~/components/Contests/TeamRegistration'
import { registerPanelLoader } from '~loaders/contests.loader'
import type { SoloContest, Team, TeamContest, User } from '~/types'

interface SoloRegisterLoaderData {
  type: 'solo'
  contest: SoloContest
  registrationId?: number
}

interface TeamRegisterLoaderData {
  type: 'team'
  contest: TeamContest
  createdTeam: Team
  registration?: any
  teamMembers?: User[]
  alreadyRegisteredMemberIds?: Set<User['id']>
}

type LoaderData = Readonly<SoloRegisterLoaderData> | Readonly<TeamRegisterLoaderData>

export const loader = registerPanelLoader

export function Component() {
  const loaderData = useLoaderData() as LoaderData
  const authState = useStore(state => state.authState)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contestTypeIsOpen = useMemo<boolean>(() => loaderData.contest.badges.includes('open'), [loaderData.contest.id])

  if (contestTypeIsOpen) {
    return <Sheet className='p-4 sm:p-6'>No registration is required for this contest.</Sheet>
  }

  return loaderData.type === 'solo' ? (
    <Sheet className='mt-6 p-6'>
      {authState.authenticated ? (
        <SoloRegistration contest={loaderData.contest} registrationId={loaderData.registrationId} />
      ) : (
        <EmptyState
          icon={accountAlertIcon}
          title='Interested in this contest?'
          description='Login to register in it...'
        />
      )}
    </Sheet>
  ) : (
    <>
      <Sheet className='mb-6 p-4 sm:p-6 markdown'>
        <h2>How does it work?</h2>

        <p>Since this is a team contest, you need to register through a team. Now you may either:</p>
        <ul>
          <li>Create your own team, or</li>
          <li>
            Join a team through an <strong>invite</strong> from the respective team leader.
          </li>
        </ul>
        <p>
          You can create, and be the leader, of only <strong>one team</strong>. But you can join as many teams as you
          want.
        </p>

        <p>
          <strong>Note: </strong>Some contests allow both solo and team participation. In that case, if you want to
          participate as solo, then you can register only yourself from a team.
        </p>
      </Sheet>

      {authState.authenticated ? (
        <TeamRegistration
          contest={loaderData.contest}
          createdTeam={loaderData.createdTeam}
          teamMembers={loaderData.teamMembers!}
          registration={loaderData.registration}
          alreadyRegisteredMemberIds={loaderData.alreadyRegisteredMemberIds!}
        />
      ) : (
        <div className='mt-6'>
          <EmptyState
            icon={accountAlertIcon}
            title='Interested in this contest?'
            description='Login to register in it...'
          />
        </div>
      )}
    </>
  )
}

Component.displayName = 'ContestRegister'
