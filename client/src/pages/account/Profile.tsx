import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import Sheet from '~common/Sheet'
import Avatar from '~common/Avatar'
import { getAuthUserData } from '~loaders/auth.loader'
import type { AuthUser } from '~/types'

export const loader = getAuthUserData

export function Component() {
  const authUser = useLoaderData() as AuthUser

  const userDetails = useMemo(
    () => [
      { label: 'Username', value: authUser.username },
      { label: 'Email', value: authUser.email },
      { label: 'Institution', value: authUser.institution },
      { label: 'Phone', value: authUser.phone_no },
    ],
    [authUser]
  )

  return (
    <Sheet as='main' className='p-4 sm:p-6'>
      <div>
        <div className='flex flex-col sm:flex-row items-center'>
          <div className='sm:mr-4 w-36 h-36'>
            <Avatar avatarIdx={authUser.avatar_idx} />
          </div>

          <div className='text-center sm:text-left'>
            <p className='mb-1 text-4xl font-bold'>{`${authUser.first_name} ${authUser.last_name}`}</p>
            <p className='text-sm text-gray-400'>{authUser.tag}</p>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
          {userDetails.map(item => (
            <div key={item.label}>
              <p className='font-semibold text-gray-400'>{item.label}</p>
              <p className='text-gray-100 truncate'>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  )
}

Component.displayName = 'Profile'
