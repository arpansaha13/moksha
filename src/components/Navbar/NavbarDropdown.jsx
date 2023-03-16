import { Fragment, memo } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import Sheet from '../common/Sheet'
import Avatar from '../common/Avatar'
import classNames from '../../utils/classNames'
import { profileTabs } from '../../data/tabs'

const Dropdown = memo(({ name, avatarIdx, onLogOut }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="block w-11 h-11 lg:w-14 lg:h-14 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-opacity-75">
          <Avatar avatarIdx={avatarIdx} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items as={Sheet} className="absolute right-0 mt-2 py-2 w-56 origin-top-right rounded-md text-sm text-gray-300 bg-amber-900/95 shadow-md shadow-darkBrown focus:outline-none backdrop-blur-sm">
          {
            profileTabs.map(item => (
              <Menu.Item key={ item.to }>
                {({ active }) => (
                  <Link
                    to={item.to}
                    className={classNames(
                      active ? 'bg-brown/40' : '',
                      'group flex w-full items-center px-3 py-2'
                    )}
                  >
                    { item.name }
                  </Link>
                )}
              </Menu.Item>
            ))
          }
          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-brown/40' : '',
                  'group flex w-full items-center px-3 py-2'
                )}
                onClick={onLogOut}
              >
                Log out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
})
export default Dropdown
