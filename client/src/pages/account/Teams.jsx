import { Link, useLoaderData } from 'react-router-dom'
import accountMultipleIcon from '@iconify-icons/mdi/account-multiple-remove-outline'
import { classNames, isNullOrUndefined } from '@arpansaha13/utils'
import Sheet from '../../components/common/Sheet'
import EmptyState from '../../components/common/EmptyState'

function Teams() {
  const { createdTeam, joinedTeams } = useLoaderData()

  return (
    <Sheet
      as='main'
      className={classNames(
        'p-4 sm:p-6 gap-y-8',
        isNullOrUndefined(createdTeam) && joinedTeams.length > 0 ? 'flex flex-col-reverse' : ''
      )}
    >
      <div>
        <h2 className='mb-6 text-2xl font-bold text-gray-50'>Team created by me</h2>
        <CreatedTeam team={createdTeam} />
      </div>

      {joinedTeams.length > 0 && (
        <div>
          <h2 className='mb-6 text-2xl font-bold text-gray-50'>Teams that I have joined</h2>

          {joinedTeams.map(team => (
            <TeamCard key={team.team_id} team={team} />
          ))}
        </div>
      )}
    </Sheet>
  )
}
export default Teams

function CreatedTeam({ team }) {
  return !isNullOrUndefined(team) ? (
    <TeamCard key={team.team_id} team={team} />
  ) : (
    <>
      <EmptyState icon={accountMultipleIcon} title='You have not created any team yet' />

      <div className='mt-1 text-center text-sm text-gray-400'>
        <p className='inline sm:block'>You can create a team while registering for a team contest.</p>
        <span className='sm:hidden'> </span>
        <p className='inline sm:block'>
          Or you can{' '}
          <Link to='/teams/create' className='text-amber-600 hover:text-amber-500 font-medium transition-colors'>
            create one now
          </Link>
          .
        </p>
      </div>
    </>
  )
}

const TeamCard = ({ team }) => (
  <div className='rounded-md lg:rounded-lg overflow-hidden bg-amber-900/80'>
    <div className='px-6 py-4 space-y-3'>
      <h3 className='text-lg font-semibold text-amber-500 hover:underline'>
        <Link to={`/teams/${team.team_id}`}>{team.team_name}</Link>
      </h3>

      <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 text-sm'>
        <div>
          <p className='font-semibold text-gray-400'>Leader</p>
          <p className='text-gray-100'>{team.leader_name}</p>
        </div>
        <div>
          <p className='font-semibold text-gray-400'>Leader id</p>
          <p className='text-gray-100'>{team.leader_id}</p>
        </div>
        <div>
          <p className='font-semibold text-gray-400'>Member count</p>
          <p className='text-gray-100'>{team.member_count}</p>
        </div>
      </div>
    </div>
  </div>
)
