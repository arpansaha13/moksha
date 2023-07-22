export default function TeamData({ team }) {
  return (
    <div className='grid grid-cols-1 2xs:grid-cols-2 gap-3 text-sm'>
      <div>
        <p className='font-semibold text-gray-400'>Leader</p>
        <p className='text-gray-100'>{team.leader.name}</p>
      </div>
      <div>
        <p className='font-semibold text-gray-400'>Member count</p>
        <p className='text-gray-100'>{team.member_count}</p>
      </div>
    </div>
  )
}
