import { useEffect, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useAppContext } from './containers/DataProvider'
import { useAnalytics } from './hooks/useAnalytics'
import Routes from './router/routes'
import AppLoader from './components/AppLoader'
import fetchWithCredentials from './utils/fetchWithCredentials'
import './styles/main.css'
import 'nprogress/nprogress.css'

function App() {
  const { setAppContext } = useAppContext()!
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWithCredentials('auth/check-auth')
      .then(({ data }) => {
        if (isNullOrUndefined(data)) {
          setAppContext('authenticated', false)
          return
        }
        setAppContext('authenticated', true)
        setAppContext('avatar_idx', data.avatar_idx)
        setAppContext('user_id', data.user_id)
      })
      .finally(() => {
        setLoading(false)
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
