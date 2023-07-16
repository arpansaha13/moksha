import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import { useAppContext } from '../../../containers/DataProvider'
import BaseButton from '../../base/BaseButton'
import Loader from '../../common/Loader'
import CsrfField from '../../common/CsrfField'
import getFormData from '../../../utils/getFormData'

const SoloRegistration = ({ contest }) => {
  const { appContext } = useAppContext()
  const fetchHook = useFetch()
  const [fetchedRegistrationState, setFetchedRegistrationState] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (appContext.authenticated) {
      fetchHook(`contests/solo/register/check/${contest.id}`).then(res => {
        setRegistered(res.registered)
        setFetchedRegistrationState(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function soloRegister(e) {
    e.preventDefault()
    setLoading(true)

    const formData = getFormData(formRef.current, { format: 'object' })
    formData.contest_id = contest.id

    fetchHook('contests/solo/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(() => {
        setRegistered(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  function cancelRegistration() {
    setLoading(true)

    fetchHook(`contests/solo/register/cancel/${contest.id}`, {
      method: 'DELETE',
    }).then(() => {
      setRegistered(false)
      setLoading(false)
    })
  }

  return (
    <form ref={formRef} className='markdown markdown-a space-x-4' onSubmit={soloRegister}>
      {fetchedRegistrationState ? (
        registered ? (
          <div>
            <p>
              Your registration has been recorded. You can see all your contest registrations{' '}
              <Link to='/account/registrations'>here</Link>.
            </p>

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
        <Loader className='w-6 mx-auto' />
      )}

      <CsrfField />
    </form>
  )
}

export default SoloRegistration
