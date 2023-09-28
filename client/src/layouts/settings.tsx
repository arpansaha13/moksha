import { Link, Outlet } from 'react-router-dom'

export default function SettingsLayout() {
  return (
    <div>
      <Link to='/account/settings' className='block w-max mb-1'>
        <span className='text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors'>
          Back to settings
        </span>
      </Link>

      <Outlet />
    </div>
  )
}
