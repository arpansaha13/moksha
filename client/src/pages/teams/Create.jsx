import { useCallback, useRef, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import Sheet from '../../components/common/Sheet'
import BaseButton from '../../components/base/BaseButton'
import BaseInput from '../../components/base/BaseInput'
import CsrfField from '../../components/common/CsrfField'
import getFormData from '../../utils/getFormData'

export default function CreateTeam() {
  const navigate = useNavigate()
  const createdTeam = useLoaderData()

  const fetchHook = useFetch()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const createTeam = useCallback(async e => {
    e.preventDefault()

    setLoading(true)
    const formData = getFormData(formRef.current, { format: 'object' })

    const res = await fetchHook('teams', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    navigate(`/teams/${res.team_id}`)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='max-w-xl mx-auto'>
      <Sheet className='py-4 p-4 sm:p-6 markdown markdown-a'>
        {createdTeam !== null ? (
          <>
            <h2>Cannot create another team</h2>

            <p>
              One user can create and be the leader of <strong>only one team</strong>.
            </p>

            <p>
              You have already created a team <Link to={`/teams/${createdTeam.team_id}`}>{createdTeam.team_name}</Link>{' '}
              with team-id <span className='text-gray-100 font-semibold'>{createdTeam.team_id}</span>
            </p>
          </>
        ) : (
          <form ref={formRef} onSubmit={createTeam}>
            <h2>Create team</h2>

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
        )}
      </Sheet>
    </main>
  )
}
