import { useEffect, useState } from 'react'
import { useAppContext } from './containers/DataProvider'
import Routes from './routes'
import fetchWithCredentials from './utils/fetchWithCredentials'
import './App.css'
import 'nprogress/nprogress.css'

function App() {
  const { setAppContext } = useAppContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWithCredentials('auth/check-auth')
      .then(res => {
        setAppContext('authenticated', true)
        setAppContext('avatar_idx', res.avatar_idx)
        setAppContext('user_id', res.user_id)
        setLoading(false)
      })
      .catch(() => {
        setAppContext('authenticated', false)
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TODO: Make a Loader
  return loading ? null : (
    <div className='text-gray-50'>
      <Routes />
    </div>
  )
}

export default App
