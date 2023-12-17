import type { Team } from '~/types'

interface TeamDataProps {
  team: Team
}

export default function TeamData({ team }: Readonly<TeamDataProps>) {
  return (
    <div className='grid grid-cols-1 2xs:grid-cols-2 gap-3 text-sm'>
      <div>
        <p className='font-semibold text-gray-400'>Leader</p>
        <p className='text-gray-100'>{`${team.leader.first_name} ${team.leader.last_name}`}</p>
      </div>
      <div>
        <p className='font-semibold text-gray-400'>Member count</p>
        <p className='text-gray-100'>{team.member_count}</p>
      </div>
    </div>
  )
}
