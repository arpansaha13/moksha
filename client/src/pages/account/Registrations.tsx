import { Link, useLoaderData } from 'react-router-dom'
import calendarRemoveIcon from '@iconify-icons/mdi/calendar-remove'
import EmptyState from '~common/EmptyState'
import RegisteredSoloContestCard from '~/components/Contests/RegisteredSoloContestCard'
import RegisteredTeamContestCard from '~/components/Contests/RegisteredTeamContestCard'
import { getAuthUserContests } from '~loaders/account.loader'

// FIXME: fix types

interface LoaderData {
  soloContests: any[]
  teamContests: any[]
}

export const loader = getAuthUserContests

export function Component() {
  const { soloContests, teamContests } = useLoaderData() as LoaderData

  if (soloContests.length === 0 && teamContests.length === 0) {
    return (
      <main>
        <div className='mt-6'>
          <EmptyState icon={calendarRemoveIcon} title='You have not registered for any contest yet' />
          <p className='text-center'>
            <Link to='/contests' className='text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors'>
              Browse contests
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className='space-y-8'>
      {soloContests.length > 0 && (
        <section id='registered-solo-contests'>
          <h2 className='mb-6 text-2xl font-bold text-gray-50'>Registered contests - Solo</h2>

          <div className='space-y-4'>
            {soloContests.map(({ contest }) => (
              <RegisteredSoloContestCard
                key={contest.id}
                clubSlug={contest.club_slug}
                contestSlug={contest.contest_slug}
              />
            ))}
          </div>
        </section>
      )}

      {teamContests.length > 0 && (
        <section id='registered-team-contests'>
          <h2 className='mb-6 text-2xl font-bold text-gray-50'>Registered contests - Team</h2>

          <div className='space-y-6'>
            {teamContests.map(({ team_contest_registration: reg }) => (
              <RegisteredTeamContestCard key={reg.id} reg={reg} showRegisteredMembers={false} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

Component.displayName = 'Registrations'
