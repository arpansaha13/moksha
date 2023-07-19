import { lazy, startTransition, useEffect, useState } from 'react'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useFetch } from '~/hooks/useFetch'
import { useAppContext } from '~/containers/DataProvider'
import Loader from '~common/Loader'

const Register = lazy(() => import('./Register'))
const CancelRegistration = lazy(() => import('./CancelRegistration'))

const SoloRegistration = ({ contest }) => {
  const { appContext } = useAppContext()
  const fetchHook = useFetch()
  const [registrationId, setRegistrationId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (appContext.authenticated) {
      const params = new URLSearchParams({ contest_id: contest.id })

      fetchHook(`contests/solo/registration?${params.toString()}`)
        .then(res => {
          setRegistrationId(res.data.id)
          startTransition(() => setLoading(false))
        })
        .catch(() => setRegistrationId(null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loader className='w-6 mx-auto' />
  }

  return (
    <div className='markdown markdown-a space-x-4'>
      {isNullOrUndefined(registrationId) ? (
        <Register contestId={contest.id} setRegistrationId={setRegistrationId} />
      ) : (
        <CancelRegistration registrationId={registrationId} setRegistrationId={setRegistrationId} />
      )}
    </div>
  )
}

export default SoloRegistration
