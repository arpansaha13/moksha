import UserListItem from './UserListItem'
import type { User } from '~/types'

interface RegisteredContestMembersProps {
  members: { user: User }[]
}

export default function RegisteredContestMembers({ members }: RegisteredContestMembersProps) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs lg:text-sm'>
      {members.map(({ user: member }) => (
        <li
          key={member.id}
          className='p-1 w-full text-gray-100 text-left flex items-center rounded-sm sm:rounded select-none'
        >
          <UserListItem user={member} />
        </li>
      ))}
    </ul>
  )
}
