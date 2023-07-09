import { memo } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import calendarRemoveIcon from '@iconify-icons/mdi/calendar-remove'
import { capitalCase } from 'change-case'
import Sheet from '../../components/common/Sheet'
import MLink from '../../components/common/Links/MLink'
import DLink from '../../components/common/Links/DLink'
import ContestTypeBadge from '../../components/Contests/ContestTypeBadge'
import CastleGate2 from '../../assets/castle-gate-2.svg' // Reference image for now
import EmptyState from '../../components/common/EmptyState'
import { getMokshaContest } from '../../data/contests/moksha'

function Registrations() {
  const { soloRegistrations } = useLoaderData()

  return (
    <main className='space-y-8'>
      {soloRegistrations.length > 0 ? (
        <section>
          <h2 className='mb-6 text-2xl font-bold text-gray-50'>Registered contests - Solo</h2>

          <div className='space-y-4'>
            {soloRegistrations.map(reg => (
              <SoloContestCard
                key={reg.contest.id}
                clubName={reg.contest.club_slug}
                contestSlug={reg.contest.contest_slug}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className='mt-6'>
          <EmptyState icon={calendarRemoveIcon} title='You have not registered for any contest yet' />
          <p className='text-center'>
            <Link to='/contests' className='text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors'>
              Browse contests
            </Link>
          </p>
        </div>
      )}
    </main>
  )
}

export default Registrations

const SoloContestCard = memo(({ clubName, contestSlug }) => {
  const contest = getMokshaContest(clubName, contestSlug)

  return (
    <MLink to={`/contests/${clubName}/${contestSlug}`} className='block'>
      <Sheet className='flex flex-row-reverse sm:flex-row overflow-hidden'>
        <div className='h-36 w-36 relative'>
          {/* Replace this image with contest poster */}
          <img src={CastleGate2} alt='' className='w-full h-full object-cover' />

          <span
            role='presentation'
            className='sm:hidden absolute inset-0 z-10 bg-gradient-to-bl from-brown/90 via-transparent mix-blend-darken'
            aria-hidden={true}
          />

          <div className='sm:hidden absolute top-2 right-2 z-20'>
            {contest.type.map(type => (
              <ContestTypeBadge key={type} small type={type} />
            ))}
          </div>
        </div>

        <div className='flex-grow px-4 sm:px-6 py-2 sm:py-4 flex flex-col justify-between'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <h3 className='text-lg font-semibold text-amber-500'>
              <DLink to={`/contests/${clubName}/${contestSlug}`} className='hover:underline'>
                {contest.name}
              </DLink>
            </h3>
            <div className='hidden sm:block'>
              {contest.type.map(type => (
                <ContestTypeBadge key={type} small type={type} />
              ))}
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
            <div>
              <p className='font-semibold text-gray-400'>Organized by</p>
              <p className='text-gray-100 capitalize'>{capitalCase(clubName)}</p>
            </div>
            <div>
              <p className='font-semibold text-gray-400'>Date</p>
              <p className='text-gray-100 italic'>Not available yet</p>
            </div>
          </div>

          <div className='hidden sm:block'>
            <DLink
              to={`/contests/${clubName}/${contestSlug}`}
              className='text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors'
            >
              View contest
            </DLink>
          </div>
        </div>
      </Sheet>
    </MLink>
  )
})
