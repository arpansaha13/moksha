import { useMemo } from 'react'
import Sheet from '../../components/common/Sheet'
import Avatar from '../../components/common/Avatar'
import { useAppContext } from '../../containers/DataProvider'

function Profile() {
  const { appContext } = useAppContext()

  const userDetails = useMemo(
    () => [
      { label: 'Name', value: appContext.authUser.name },
      { label: 'Username', value: appContext.authUser.username },
      { label: 'Email', value: appContext.authUser.email },
      { label: 'Institution', value: appContext.authUser.institution_name },
      { label: 'Phone', value: appContext.authUser.phone_no },
    ],
    [appContext]
  )

  return (
    <Sheet as='main' className='p-4 sm:p-6'>
      <div>
        <div className='w-36 h-36'>
          <Avatar avatarIdx={appContext.authUser.avatar_idx} />
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
