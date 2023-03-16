import { memo, useState } from 'react'
import accountMultipleIcon from '@iconify-icons/mdi/account-multiple-remove-outline'
import Sheet from '../../components/common/Sheet'
import EmptyState from '../../components/common/EmptyState'
import CastleGate2 from '../../assets/castle-gate-2.svg' // Reference image for now

function Teams() {
  const [createdTeams, setCreatedTeams] = useState([
    {
      team_id: 1,
      team_name: 'Created team name',
      leader_id: 21321,
      count: 43,
    },
  ])
  const [joinedTeams, seJoinedTeams] = useState([
    {
      team_id: 1,
      team_name: 'Joined eam name',
      leader_id: 'fbjkida',
      count: 43,
    },
  ])

  return (
    <Sheet as='main' className='p-4 sm:p-6 space-y-8'>
      <div>
        <h2 className='mb-6 text-2xl font-bold text-gray-50'>Team created by me</h2>

        {createdTeams.length > 0 ? (
          createdTeams.map(team => <TeamCard key={team.team_id} team={team} />)
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

      <div>
        <h2 className='mb-6 text-2xl font-bold text-gray-50'>Teams that I have joined</h2>

        {joinedTeams.length > 0 ? (
          joinedTeams.map(team => <TeamCard key={team.team_id} team={team} />)
        ) : (
          <div className='mt-6'>
            <EmptyState
              icon={accountMultipleIcon}
              title='You have not joined any team yet'
              description='You can join a team while registering for a team contest'
            />
          </div>
        )}
      </div>
    </Sheet>
  )
}
export default Teams

const TeamCard = memo(({ team }) => (
  <div className='rounded-md lg:rounded-lg overflow-hidden bg-amber-900/80'>
    <div className='px-6 py-4 space-y-3'>
      <h3 className='text-lg font-semibold text-amber-500'>{team.team_name}</h3>

      <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 text-sm'>
        <div>
          <p className='font-semibold text-gray-400'>Leader</p>
          <p className='text-gray-100'>{team.leader_id}</p>
        </div>
        <div>
          <p className='font-semibold text-gray-400'>
            Member count
          </p>
          <p className='text-gray-100'>{team.count}</p>
        </div>
        {/* <div>
          <p className='font-semibold text-gray-400'>Joined on</p>
          <p className='text-gray-100'>2nd August 2023</p>
        </div> */}
      </div>

      <div>
        <button className='text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors'>
          View members
        </button>
      </div>
    </div>
  </div>
))
