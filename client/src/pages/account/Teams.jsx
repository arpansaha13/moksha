import { memo } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import accountMultipleIcon from '@iconify-icons/mdi/account-multiple-remove-outline'
import Sheet from '../../components/common/Sheet'
import EmptyState from '../../components/common/EmptyState'

function Teams() {
  const { createdTeam, joinedTeams } = useLoaderData()

  return (
    <Sheet as='main' className='p-4 sm:p-6 space-y-8'>
      <div>
        <h2 className='mb-6 text-2xl font-bold text-gray-50'>Team created by me</h2>

        {createdTeam !== null ? (
          <TeamCard key={createdTeam.team_id} team={createdTeam} />
        ) : (
          <div className='mt-6'>
            <EmptyState
              icon={accountMultipleIcon}
              title='You have not created any team yet'
              description='You can create a team while registering for a team contest'
            />
          </div>
        )}
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

const TeamCard = memo(({ team }) => (
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
))
