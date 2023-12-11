import { lazy, startTransition, useEffect, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useStore } from './store'
import { useAnalytics } from './hooks/useAnalytics'
import AppLoader from './components/AppLoader'
import fetchWithCredentials from './utils/fetchWithCredentials'
import './styles/main.css'
import 'nprogress/nprogress.css'

const Routes = lazy(() => import('./router/routes'))

function App() {
  const setAuthState = useStore(state => state.setAuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWithCredentials('auth/check-auth')
      .then(({ data }) => {
        if (isNullOrUndefined(data)) {
          setAuthState('authenticated', false)
          return
        }
        setAuthState('authenticated', true)
        setAuthState('avatar_idx', data.avatar_idx)
        setAuthState('user_id', data.user_id)
      })
      .finally(() => {
        startTransition(() => setLoading(false))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useAnalytics()

  return loading ? (
    <AppLoader />
  ) : (
    <div className='text-gray-50'>
      <Routes />
    </div>
  )
}

export default App
