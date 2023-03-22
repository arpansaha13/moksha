import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import Sheet from '../../components/common/Sheet'
import Avatar from '../../components/common/Avatar'

function Profile() {
  const authUser = useLoaderData()

  const userDetails = useMemo(
    () => [
      { label: 'Name', value: authUser.name },
      { label: 'Username', value: authUser.username },
      { label: 'Email', value: authUser.email },
      { label: 'Institution', value: authUser.institution_name },
      { label: 'Phone', value: authUser.phone_no },
    ],
    [authUser]
  )

  return (
    <Sheet as='main' className='p-4 sm:p-6'>
      <div>
        <div className='w-36 h-36'>
          <Avatar avatarIdx={authUser.avatar_idx} />
        </div>

        <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
          {userDetails.map(item => (
            <div key={item.label}>
              <p className='font-semibold text-gray-400'>{item.label}</p>
              <p className='text-gray-100'>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  )
}
export default Profile
