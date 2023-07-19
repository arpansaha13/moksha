import { startTransition, useState } from 'react'
import { useFetch } from '~/hooks/useFetch'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import TeamMemberListItem from '../../../Teams/TeamMemberListItem'

export default function Registered({ contestId, team, registration, setRegistration }) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)

  function cancelRegistration(e) {
    e.preventDefault()
    setLoading(true)

    fetchHook('contests/team/registration', {
      method: 'DELETE',
      body: JSON.stringify({
        team_id: team.team_id,
        contest_id: contestId,
      }),
    })
      .then(() => startTransition(() => setRegistration(null)))
      .finally(() => setLoading(false))
  }

  return (
    <Sheet className='p-4 sm:p-6 markdown'>
      <h2>Registered with {team.team_name}</h2>

      <h3>Participating members</h3>

      <div className='not-prose'>
        <ParticipatingMembers members={registration.registered_members} />
      </div>

      <form className='mt-3 ml-auto w-max' onSubmit={cancelRegistration}>
        <BaseButton type='submit' secondary loading={loading}>
          Cancel registration
        </BaseButton>
      </form>
    </Sheet>
  )
}

function ParticipatingMembers({ members }) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs lg:text-sm'>
      {members.map(({ user: member }) => (
        <li
          key={member.user_id}
          className='p-1 w-full text-gray-100 text-left flex items-center rounded-sm sm:rounded select-none'
        >
          <TeamMemberListItem user={member} />
        </li>
      ))}
    </ul>
  )
}
