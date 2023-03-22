import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import accountAlertIcon from '@iconify-icons/mdi/account-alert'
import { useFetch } from '../../hooks/useFetch'
import { useAppContext } from '../../containers/DataProvider'
import BaseButton from '../base/BaseButton'
import Sheet from '../common/Sheet'
import EmptyState from '../common/EmptyState'
import ContestOverview from './ContestOverview'

const SoloRegistration = memo(() => {
  const { appContext } = useAppContext()
  const params = useParams()
  const fetchHook = useFetch()
  const [fetchedRegistrationState, setFetchedRegistrationState] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (appContext.authenticated) {
      fetchHook(`new/solo-contest/register/check/${params.contest}`).then(res => {
        console.log(res)
        setRegistered(res.registered)
        setFetchedRegistrationState(true)
      })
    }
  }, [])

  function soloRegister(e) {
    e.preventDefault()
    setLoading(true)

    fetchHook('new/solo-contest/register', {
      method: 'POST',
      body: JSON.stringify({ contest_slug: params.contest }),
    }).then(() => {
      setRegistered(true)
      setLoading(false)
    })
  }

  function cancelRegistration() {
    setLoading(true)

    fetchHook(`new/solo-contest/register/cancel/${params.contest}`, {
      method: 'DELETE',
    }).then(() => {
      setRegistered(false)
      setLoading(false)
    })
  }

  return (
    <>
      <div className='mt-6'>
        <ContestOverview />
      </div>

      <Sheet className='mt-6 p-6'>
        {appContext.authenticated ? (
          <form className='markdown space-x-4' onSubmit={soloRegister}>
            {fetchedRegistrationState ? (
              registered ? (
                <div>
                  <p>Your registration has been recorded.</p>

                  <div className='not-prose'>
                    <BaseButton secondary loading={loading} onClick={cancelRegistration}>
                      Cancel registration
                    </BaseButton>
                  </div>
                </div>
              ) : (
                <div className='not-prose'>
                  <BaseButton type='submit' loading={loading}>
                    Register
                  </BaseButton>
                </div>
              )
            ) : (
              <div className='w-6 mx-auto aspect-square border-y-2 border-gray-50 rounded-full animate-spin' />
            )}
          </form>
        ) : (
          <EmptyState
            icon={accountAlertIcon}
            title='Interested in this contest?'
            description='Login to register in it...'
          />
        )}
      </Sheet>
    </>
  )
})
export default SoloRegistration
