/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNotification } from '~/hooks/useNotification'

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

export function useAuthLayoutController() {
  const [notification, { set: setNotification, setAll: setAllNotification }] = useNotification()

  const setShowNotification = useCallback((bool: boolean) => setNotification('show', bool), [])

  const location = useLocation()
  const [heading, setHeading] = useState(getHeading(location.pathname))

  useEffect(() => {
    setHeading(getHeading(location.pathname))
    setShowNotification(false)
  }, [location.pathname])

  const authContext = useMemo(() => ({ notification, setNotification, setAllNotification }), [notification])

  return { notification, authContext, heading, setShowNotification }
}
