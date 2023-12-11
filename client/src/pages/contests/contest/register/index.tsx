import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useStore } from '~/store'
import Sheet from '~common/Sheet'
import EmptyState from '~common/EmptyState'
import SoloRegistration from '~/components/Contests/SoloRegistration'
import TeamRegistration from '~/components/Contests/TeamRegistration'
import { getContest } from '~loaders/contests.loader'
import type { Contest, TeamContest } from '~/types'

export const loader = getContest

export function Component() {
  const contest = useLoaderData() as Contest
  const authState = useStore(state => state.authState)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contestTypeIsOpen = useMemo<boolean>(() => contest.type.includes('open'), [contest.id])

  return (
    // FIXME: types. Add badges prop in contest
    isNullOrUndefined((contest as TeamContest).allowedTeamSize) ? (
      <>
        {!contestTypeIsOpen ? (
          <Sheet className='mt-6 p-6'>
            {authState.authenticated ? (
              <SoloRegistration contest={contest} />
            ) : (
              <EmptyState
                icon={accountAlertIcon}
                title='Interested in this contest?'
                description='Login to register in it...'
              />
            )}
          </Sheet>
        ) : (
          <>No registration is required for this contest.</>
        )}
      </>
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
        </Sheet>

        {authState.authenticated ? (
          <TeamRegistration contest={contest as TeamContest} />
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
  )
}

Component.displayName = 'ContestRegister'
