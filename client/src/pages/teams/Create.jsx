import { useCallback, useRef } from 'react'
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

  const createTeam = useCallback(e => {
    e.preventDefault()

    const formData = getFormData(formRef.current, { format: 'object' })

    fetchHook('teams/create', {
      method: 'POST',
      body: JSON.stringify(formData),
    }).then(res => {
      navigate(`/teams/${res.team_id}`)
    })
  }, [])

  return (
    <main className='max-w-xl mx-auto'>
      <Sheet className='py-4 p-4 sm:p-6 markdown prose-a:no-underline prose-a:font-medium prose-a:text-amber-600'>
        {createdTeam !== null ? (
          <>
            <h2>Cannot create another team</h2>

            <p>
              One user can create and be the leader of <strong>only one team</strong>.
            </p>

            <p>
              You have already created a team{' '}
              <Link to={`/teams/${createdTeam.team_id}`} className='hover:text-amber-500 transition-colors'>
                {createdTeam.team_name}
              </Link>{' '}
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
              <BaseButton type='submit'>Create team</BaseButton>
            </div>
          </form>
        )}
      </Sheet>
    </main>
  )
}
