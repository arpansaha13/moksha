import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Notification from '../components/common/Notification'
import CastleGate3 from '../assets/castle-gate-3.svg'
import { useAuthContext } from '../containers/AuthProvider'

const getHeading = (route) => {
  switch (route) {
    case '/auth/login':
      return 'Login to your account'
    case '/auth/register':
      return 'Create your account'
    case '/auth/verification':
      return 'Verify your account'
    case '/auth/forgot-password':
      return 'Forgot password'
    default:
      return null
  }
}

export default function AuthLayout() {
  const { notification, setNotification } = useAuthContext()
  const setShowNotification = useCallback(bool => setNotification('show', bool), [])

  const location = useLocation()
  const [heading, setHeading] = useState(getHeading(location.pathname))

  useEffect(() => {
    setHeading(getHeading(location.pathname))
    setShowNotification(false)
  }, [location.pathname])

  return (
    <div className="relative min-w-screen min-h-screen text-white">
      <img role="presentation" src={CastleGate3} alt='' className='fixed w-screen h-screen object-cover' aria-hidden={true} />
      <span role="presentation" className='fixed w-screen h-screen z-10 bg-darkBrown/90 mix-blend-darken' />

      <div className="min-w-screen min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8 relative z-20">
        <Notification
          show={notification.show}
          setShow={setShowNotification}
          status={ notification.status }
          title={ notification.title }
          description={ notification.description }
        />

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="block mx-auto w-16 h-16 relative">
            <img src="/moksha-logo.svg" alt="Moksha logo" className='w-full h-full' />
          </Link>
          <h2 className="mt-6 px-2 sm:px-0 text-center text-3xl font-bold tracking-tight">
            {heading}
          </h2>
        </div>

        <div className="mt-8 w-full [&>*]:sm:mx-auto [&>*]:py-8 [&>*]px-4 [&>*]:sm:px-10 [&>*]:sm:w-full [&>*]:bg-amber-900/50 [&>*]:sm:rounded-lg [&>*]:shadow">
          {/* Use appropriate max-w-{size} on the root of this children */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
