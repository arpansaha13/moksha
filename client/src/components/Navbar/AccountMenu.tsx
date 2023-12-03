import { Fragment, memo } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import logoutIcon from '@iconify-icons/mdi/logout'
import { classNames } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import Avatar from '~common/Avatar'
import { profileTabs } from '~/data/tabs'

interface AccountMenuProps {
  avatarIdx: number
  onLogOut: () => void
}

const AccountMenu = memo(({ avatarIdx, onLogOut }: AccountMenuProps) => {
  return (
    <Menu as='div' className='relative inline-block'>
      <div>
        <Menu.Button className='block w-11 h-11 lg:w-14 lg:h-14 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-opacity-75'>
          <Avatar avatarIdx={avatarIdx} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          as={Sheet}
          className='absolute right-0 mt-2 py-2 w-56 origin-top-right rounded-md text-sm text-gray-300 bg-amber-900/95 shadow-lg shadow-darkBrown ring-1 ring-darkBrown ring-opacity-5 focus:outline-none backdrop-blur-sm'
        >
          {profileTabs.map(tab => (
            <Menu.Item key={tab.to}>
              {({ active }) => (
                <Link
                  to={tab.to}
                  className={classNames(active ? 'bg-brown/40' : '', 'flex gap-x-2 w-full items-center px-3 py-2')}
                >
                  <div className='w-5 h-5 text-gray-200 flex-shrink-0'>
                    <Icon icon={tab.icon} className='block' color='inherit' width='100%' height='100%' />
                  </div>
                  <p>{tab.name}</p>
                </Link>
              )}
            </Menu.Item>
          ))}

          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-brown/40' : '',
                  'flex gap-x-2 w-full border-t border-amber-800 items-center px-3 py-2'
                )}
                onClick={onLogOut}
              >
                <div className='w-5 h-5 text-gray-200 flex-shrink-0'>
                  <Icon icon={logoutIcon} className='block' color='inherit' width='100%' height='100%' />
                </div>
                <p>Log out</p>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
})

export default AccountMenu
