import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isNullOrUndefined } from '@arpansaha13/utils'
import { useFetch } from '~/hooks/useFetch'
import Sheet from '~common/Sheet'
import Loader from '~common/Loader'
import EmptyState from '~common/EmptyState'
import TeamData from '~/components/Teams/TeamData'
import RegisteredContestMembers from '~/components/Teams/RegisteredContestMembers'

export default function RegistrationsPanel({ contest }) {
  const fetchHook = useFetch()
  const [reg, setReg] = useState(null)
  const [createdTeamReg, setCreatedTeamReg] = useState(null)
  const [hasCreatedTeam, setHasCreatedTeam] = useState(false)
  const [fromCreatedTeam, setFromCreatedTeam] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchAuthUserReg(fetchHook, contest.id), fetchCreatedTeamReg(fetchHook, contest.id)])
      .then(res => {
        setReg(res[0])
        setHasCreatedTeam(res[1].hasCreatedTeam)

        if (!res[1].hasCreatedTeam) return

        setCreatedTeamReg(res[1].data)
        setFromCreatedTeam(
          !isNullOrUndefined(res[0]) && !isNullOrUndefined(res[1].data) && res[0].id === res[1].data.id
        )
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loader className='mx-auto w-6 h-6' />
  }

  return (
    <div className='space-y-6'>
      <MyRegistration reg={reg} fromCreatedTeam={fromCreatedTeam} />

      {hasCreatedTeam && !fromCreatedTeam && <CreatedTeamRegistration reg={createdTeamReg} />}
    </div>
  )
}

function MyRegistration({ reg, fromCreatedTeam }) {
  return (
    <div>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold'>My registration</h2>
        <p className='text-sm text-gray-400'>Registration specific to your participation in this contest.</p>

        {fromCreatedTeam && (
          <p className='mt-1 text-sm text-gray-400'>
            <em>You have registered from you created team - {reg.team.team_name}</em>
          </p>
        )}
      </div>

      {isNullOrUndefined(reg) ? (
        <EmptyState title='No registration found' description='You have not registered in this contest' />
      ) : (
        <Registration reg={reg} />
      )}
    </div>
  )
}

function CreatedTeamRegistration({ reg }) {
  return (
    <div>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold'>My created team</h2>
        <p className='text-sm text-gray-400'>Registration in this contest from your created team.</p>
      </div>

      {isNullOrUndefined(reg) ? (
        <EmptyState title='No registration found' description='Your team has not registered in this contest' />
      ) : (
        <Registration reg={reg} />
      )}
    </div>
  )
}

const Registration = memo(({ reg }) => {
  return (
    <Sheet className='px-6 py-4'>
      <h3 className='mb-2 text-xl font-semibold'>
        <Link to={`/teams/${reg.team.team_id}`} className='text-amber-500 hover:underline'>
          {reg.team.team_name}
        </Link>
      </h3>

      <TeamData team={reg.team} />

      <h4 className='mt-6 mb-2 text-lg text-gray-300 font-semibold'>Participating members</h4>

      <RegisteredContestMembers members={reg.registered_members} />
    </Sheet>
  )
})

async function fetchAuthUserReg(fetchHook, contestId) {
  const params = new URLSearchParams({ contest_id: contestId }).toString()
  const res = await fetchHook(`users/me/registered-team-contests?${params}`)
  return res.data?.team_contest_registration
}

async function fetchCreatedTeamReg(fetchHook, contestId) {
  const { data: team } = await fetchHook('users/me/created-team')

  if (isNullOrUndefined(team)) return { hasCreatedTeam: false, data: null }

  const params = new URLSearchParams({ contest_id: contestId }).toString()
  const res = await fetchHook(`teams/${team.team_id}/registered-contests?${params}`)
  return { hasCreatedTeam: true, data: res.data }
}
