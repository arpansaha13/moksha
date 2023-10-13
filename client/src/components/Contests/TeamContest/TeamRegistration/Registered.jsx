import { startTransition, useState } from 'react'
import { useFetch } from '~/hooks/common/useFetch'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import RegisteredContestMembers from '~/components/Teams/RegisteredContestMembers'

export default function Registered({ contestId, team, registration, setRegistration }) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  function cancelRegistration(e) {
    e.preventDefault()
    setLoading(true)

    fetchHook('contests/team/registration', {
      method: 'DELETE',
      body: {
        team_id: team.team_id,
        contest_id: contestId,
      },
    })
      .then(() =>
        startTransition(() => {
          setRegistration(null)
          setLoading(false)
        })
      )
      .catch(() => setLoading(false))
  }

  return (
    <Sheet className='p-4 sm:p-6 markdown'>
      <h2>Registered with {team.team_name}</h2>

      <h3>Participating members</h3>

      <div className='not-prose'>
        <RegisteredContestMembers members={registration.registered_members} />
      </div>

      <form className='mt-3 ml-auto w-max' onSubmit={cancelRegistration}>
        <BaseButton type='submit' secondary loading={loading}>
          Cancel registration
        </BaseButton>
      </form>
    </Sheet>
  )
}
