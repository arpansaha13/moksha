import { useEffect, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useAppContext } from './containers/DataProvider'
import Routes from './router/routes'
import AppLoader from './components/AppLoader'
import fetchWithCredentials from './utils/fetchWithCredentials'
import './styles/main.css'
import 'nprogress/nprogress.css'

function App() {
  const { setAppContext } = useAppContext()
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

    // prettier-ignore
    if (import.meta.env.VITE_ENV_RELEASE === 'true') {
        window.dataLayer = window.dataLayer || [];
        // eslint-disable-next-line no-inner-declarations, no-undef
        function gtag () { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-4C109JEE0T');

        (function (c, l, a, r, i, t, y) {
          c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
          t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
          y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "ikppq7ny7u");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <AppLoader />
  ) : (
    <div className='text-gray-50'>
      <Routes />
    </div>
  )
}

export default App
