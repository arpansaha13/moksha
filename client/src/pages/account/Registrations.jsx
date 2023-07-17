import { Link, useLoaderData } from 'react-router-dom'
import calendarRemoveIcon from '@iconify-icons/mdi/calendar-remove'
import EmptyState from '../../components/common/EmptyState'
import RegisteredContestCard from '../../components/Contests/RegisteredContestCard'

function Registrations() {
  const { soloRegistrations } = useLoaderData()

  return (
    <main className='space-y-8'>
      {soloRegistrations.length > 0 ? (
        <section>
          <h2 className='mb-6 text-2xl font-bold text-gray-50'>Registered contests - Solo</h2>

          <div className='space-y-4'>
            {soloRegistrations.map(({ contest }) => (
              <RegisteredContestCard key={contest.id} clubName={contest.club_slug} contestSlug={contest.contest_slug} />
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
