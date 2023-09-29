import nprogress from 'nprogress'
import { Link } from 'react-router-dom'
import Sheet from '~common/Sheet'

export const loader = () => nprogress.done()

const options = Object.freeze([
  {
    name: 'Edit profile',
    to: '/account/settings/edit-profile',
  },
  {
    name: 'Change password',
    to: '/account/settings/change-password',
  },
])

export function Component() {
  return (
    <main>
      <h2 className='mb-4 text-xl sm:text-2xl font-bold text-gray-50'>Settings</h2>

      <Sheet as='ul' className='text-sm divide-y divide-amber-800/60 overflow-hidden'>
        {options.map(option => (
          <li key={option.name}>
            <Link to={option.to} className='block px-4 sm:px-6 py-4'>
              {option.name}
            </Link>
          </li>
        ))}
      </Sheet>
    </main>
  )
}

Component.displayName = 'Settings'
