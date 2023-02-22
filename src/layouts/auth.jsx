import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import AuthProvider from '../containers/AuthProvider'
import CastleGate3 from '../assets/castle-gate-3.svg'

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
  const location = useLocation()
  const [heading, setHeading] = useState(getHeading(location.pathname))

  useEffect(() => setHeading(getHeading(location.pathname)), [location])

  return (
    <div className="relative min-w-screen min-h-screen bg-brown text-white">
      <img src={CastleGate3} alt='' className='fixed w-full h-full object-cover' aria-hidden={true} />
      <span className='fixed inset-0 z-10 bg-darkBrown/90 mix-blend-darken' />

      <div className="min-w-screen min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8 relative z-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="block mx-auto w-16 h-16 relative">
            <img src="/moksha-logo.svg" alt="Moksha logo" />
          </Link>
          <h2 className="mt-6 px-2 sm:px-0 text-center text-3xl font-bold tracking-tight text-gray-50">
            {heading}
          </h2>
        </div>

        <div className="mt-8 w-full [&>*]:sm:mx-auto [&>*]:py-8 [&>*]px-4 [&>*]:sm:px-10 [&>*]:sm:w-full [&>*]:bg-amber-900/50 [&>*]:sm:rounded-lg [&>*]:shadow">
          <AuthProvider>
            {/* Use appropriate max-w-{size} on the root of this children */}
            <Outlet />
          </AuthProvider>
        </div>
      </div>
    </div>
  )
}
