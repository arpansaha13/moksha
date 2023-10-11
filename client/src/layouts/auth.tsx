/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useMap } from '~/hooks/useMap'
import Notification, { type NotificationStatus } from '~/components/common/Notification'
import AuthBg from '~/components/pictures/AuthBg'
import MokshaLogo from '~/components/pictures/MokshaLogo'

const getHeading = (route: string) => {
  switch (route) {
    case '/auth/login':
      return 'Login to your account'
    case '/auth/register':
      return 'Create your account'
    case '/auth/forgot-password':
      return 'Forgot password'
    default:
      if (route.startsWith('/auth/verification')) return 'Verify your account'
      if (route.startsWith('/auth/reset-password')) return 'Reset your password'
      return null
  }
}

export default function AuthLayout() {
  const [notification, { set: setNotification, setAll: setAllNotification }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success' as NotificationStatus,
  })

  const setShowNotification = useCallback((bool: boolean) => setNotification('show', bool), [])

  const location = useLocation()
  const [heading, setHeading] = useState(getHeading(location.pathname))

  useEffect(() => {
    setHeading(getHeading(location.pathname))
    setShowNotification(false)
  }, [location.pathname])

  const authContext = useMemo(() => ({ notification, setNotification, setAllNotification }), [notification])

  return (
    <div className='relative min-w-screen min-h-screen text-white'>
      <AuthBg />

      <div className='min-w-screen min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8 relative z-20'>
        <Notification
          show={notification.show}
          setShow={setShowNotification}
          status={notification.status}
          title={notification.title}
          description={notification.description}
        />

        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <Link to='/' className='block mx-auto w-16 h-16 relative'>
            <MokshaLogo />
          </Link>
          <h2 className='mt-6 px-2 sm:px-0 text-center text-3xl font-bold tracking-tight'>{heading}</h2>
        </div>

        <div className='mt-8 w-full [&>*]:mx-auto [&>*]:py-8 [&>*]px-4 [&>*]:sm:px-10 [&>*]:sm:w-full [&>*]:bg-amber-900/50 [&>*]:sm:rounded-lg [&>*]:shadow'>
          {/* Use appropriate max-w-{size} on the root of this children */}
          <Outlet context={authContext} />
        </div>
      </div>
    </div>
  )
}
