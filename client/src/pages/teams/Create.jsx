import { useCallback, useRef, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useMap } from '~/hooks/useMap'
import { useFetch } from '~/hooks/useFetch'
import Sheet from '~common/Sheet'
import BaseButton from '~base/BaseButton'
import BaseInput from '~base/BaseInput'
import CsrfField from '~common/CsrfField'
import Notification from '~common/Notification'
import getFormData from '~/utils/getFormData'
import { allowIfNoTeamCreated } from '~loaders/teams.loader'

export const loader = allowIfNoTeamCreated

export function Component() {
  const createdTeam = useLoaderData()

  const [notification, { set, setAll }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setShowNotification = useCallback(bool => set('show', bool), [])

  return (
    <main className='max-w-xl mx-auto h-cover flex flex-col justify-center relative'>
      <Notification
        show={notification.show}
        setShow={setShowNotification}
        status={notification.status}
        title={notification.title}
        description={notification.description}
        className='top-16'
      />

      <div className='markdown markdown-a'>
        <h1 className='text-center sm:text-left'>Create team</h1>

        <Sheet className='py-4 p-4 sm:p-6'>
          {!isNullOrUndefined(createdTeam) ? (
            <>
              <h2>Cannot create another team</h2>

              <p>
                One user can create and be the leader of <strong>only one team</strong>.
              </p>

              <p>
                You have already created a team{' '}
                <Link to={`/teams/${createdTeam.team_id}`}>{createdTeam.team_name}</Link>.
              </p>
            </>
          ) : (
            <CreateTeamForm setShowNotification={setShowNotification} setAll={setAll} />
          )}
        </Sheet>
      </div>
    </main>
  )
}

Component.displayName = 'CreateTeam'

function CreateTeamForm({ setShowNotification, setAll }) {
  const navigate = useNavigate()
  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const createTeam = useCallback(e => {
    e.preventDefault()

    setLoading(true)
    const formData = getFormData(formRef.current)

    fetchHook('teams', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        navigate(`/teams/${res.team_id}`)
        setShowNotification(false)
      })
      .catch(err => {
        if (Number(err.status) !== 409) throw err

        setAll({
          show: true,
          title: 'Team creation failed',
          description: err.message,
          status: 'error',
        })
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form ref={formRef} onSubmit={createTeam}>
      <p>Creating a team is as simple as choosing a name and pressing the button.</p>

      <p>One user can create and be the leader of only one team.</p>

      <div className='not-prose mt-6'>
        <BaseInput name='team_name' type='text' label='Team name' required />
      </div>

      <CsrfField />

      <div className='mt-6 flex flex-col sm:flex-row sm:justify-end gap-4'>
        <BaseButton loading={loading} type='submit'>
          Create team
        </BaseButton>
      </div>
    </form>
  )
}
