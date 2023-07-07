import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import calendarRemoveIcon from '@iconify-icons/mdi/calendar-remove'
import Sheet from '../../components/common/Sheet'
import ContestTypeBadge from '../../components/Contests/ContestTypeBadge'
import CastleGate2 from '../../assets/castle-gate-2.svg' // Reference image for now
import EmptyState from '../../components/common/EmptyState'
import { getMokshaContest } from '../../data/contests/moksha'

function Registrations() {
  const [registeredEvents] = useState([
    {
      team_id: 1,
      team_name: 'Created team name',
      leader_id: 21321,
    },
  ])
  const [registeredContests] = useState([
    {
      club: 'malhar',
      contest_slug: 'solo-singing',
    },
  ])

  return (
    <Sheet as='main' className='p-4 sm:p-6 space-y-8'>
      <div>
        <h2 className='mb-6 text-2xl font-bold text-gray-50'>Event registrations</h2>

        {registeredEvents.length > 0 ? (
          registeredEvents.map(event => <RegisteredEventCard key={event.event_slug} event={event} />)
        ) : (
          <div className='mt-6'>
            <EmptyState
              icon={calendarRemoveIcon}
              title='You have not created any team yet'
              description='You can create a team while registering for a team contest'
            />
          </div>
        )}
      </div>

      <div>
        <h2 className='mb-6 text-2xl font-bold text-gray-50'>Contest registrations</h2>

        {registeredContests.length > 0 ? (
          registeredContests.map(contest => (
            <RegisteredContestCard
              key={contest.contest_slug}
              clubName={contest.club}
              contestSlug={contest.contest_slug}
            />
          ))
        ) : (
          <div className='mt-6'>
            <EmptyState
              icon={calendarRemoveIcon}
              title='You have not joined any team yet'
              description='You can join a team while registering for a team contest'
            />
          </div>
        )}
      </div>
    </Sheet>
  )
}
export default Registrations

// eslint-disable-next-line no-unused-vars
const RegisteredEventCard = memo(({ event }) => (
  <div className='flex rounded-md lg:rounded-lg overflow-hidden bg-amber-900/80'>
    <div className='h-36 w-36 object-contain'>
      <img src={CastleGate2} alt='' className='w-full h-full object-cover' aria-hidden />
    </div>

    <div className='flex-grow px-6 py-4'>
      <h3 className='mb-6 text-lg font-semibold text-amber-500'>Event name</h3>
    </div>
  </div>
))

const RegisteredContestCard = memo(({ clubName, contestSlug }) => {
  const contest = getMokshaContest(clubName, contestSlug)

  return (
    <div className='flex rounded-md lg:rounded-lg overflow-hidden bg-amber-900/80'>
      <div className='h-36 w-36 object-contain'>
        <img src={CastleGate2} alt='' className='w-full h-full object-cover' aria-hidden />
      </div>

      <div className='flex-grow px-6 py-4 flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-amber-500'>{contest.name}</h3>
          {contest.type.map(type => (
            <ContestTypeBadge key={type} small type={type} />
          ))}
        </div>

        <div className='grid grid-cols-2 text-sm'>
          <div>
            <p className='font-semibold text-gray-400'>Organized by</p>
            <p className='text-gray-100 capitalize'>{clubName}</p>
          </div>
          <div>
            <p className='font-semibold text-gray-400'>Date</p>
            <p className='text-gray-100'>{contest.slug}</p>
          </div>
        </div>

        <div>
          <Link
            to={`/contests/${clubName}/${contestSlug}`}
            className='text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors'
          >
            View contest
          </Link>
        </div>
      </div>
    </div>
  )
})
