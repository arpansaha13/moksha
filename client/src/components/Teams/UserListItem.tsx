import Avatar from '~common/Avatar'
import type { User } from '~/types'

interface UserListItemProps {
  user: User
}

const UserListItem = ({ user }: UserListItemProps) => (
  <>
    <div className='w-9 h-9 lg:w-12 lg:h-12'>
      <Avatar avatarIdx={user.avatar_idx} />
    </div>

    <div className='ml-1 lg:ml-2 flex-grow'>
      <p className='font-semibold'>{`${user.first_name} ${user.last_name}`}</p>
      <p className='text-gray-400'>{`@${user.username}`}</p>
    </div>
  </>
)

export default UserListItem
