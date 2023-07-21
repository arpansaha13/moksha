import { startTransition, useState } from 'react'
import { classNames } from '@arpansaha13/utils'
import { useSet } from '~/hooks/useSet'
import { useFetch } from '~/hooks/useFetch'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import Callout from '~common/Callout'
import UserListItem from '../../../Teams/UserListItem'

export default function Register({ contest, team, members, setRegistration }) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const { add, delete: del, has, size: selectedCount, toArray } = useSet([])

  const minMembersRequired = getMinMembersRequiredCount(contest.allowedTeamSize)

  function teamRegister(e) {
    e.preventDefault()

    if (!isTeamSizeValid(contest.allowedTeamSize, selectedCount)) {
      // TODO: add indicator
      return
    }
    setLoading(true)

    fetchHook('contests/team/registration', {
      method: 'POST',
      body: JSON.stringify({
        team_id: team.team_id,
        contest_id: contest.id,
        selected_members: toArray(),
      }),
    })
      .then(res =>
        startTransition(() => {
          setRegistration(res.data)
          setLoading(false)
        })
      )
      .catch(() => setLoading(false))
  }

  return (
    <Sheet className='p-4 sm:p-6 markdown'>
      <h2>Register with {team.team_name}</h2>

      {members.length < minMembersRequired && (
        <ParticipationNotPossibleWarning minMembersRequired={minMembersRequired} />
      )}

      <h3>Select members</h3>

      <div className='not-prose mb-4 space-y-4'>
        <div>
          <TeamMembers members={members} add={add} del={del} has={has} />
        </div>

        <p className='text-sm'>Members selected: {selectedCount}</p>

        <AllowedTeamSizes sizes={contest.allowedTeamSize} />
      </div>

      <form className='ml-auto w-max' onSubmit={teamRegister}>
        <BaseButton type='submit' loading={loading}>
          Register
        </BaseButton>
      </form>
    </Sheet>
  )
}

function TeamMembers({ members, add, del, has }) {
  function toggle(userId) {
    if (has(userId)) del(userId)
    else add(userId)
  }

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs lg:text-sm'>
      {members.map(member => (
        <li
          key={member.user_id}
          className={classNames(
            'rounded-sm sm:rounded select-none',
            has(member.user_id) ? 'bg-amber-800/60' : 'hover:bg-amber-800/30'
          )}
        >
          <button
            className='p-1 w-full text-gray-100 text-left flex items-center'
            onClick={() => toggle(member.user_id)}
          >
            <UserListItem user={member} />
          </button>
        </li>
      ))}
    </ul>
  )
}

function ParticipationNotPossibleWarning({ minMembersRequired }) {
  return (
    <Callout type='warning' className='not-prose'>
      Your team does not have enough members to participate in this contest. A minimum of{' '}
      <strong>{minMembersRequired} members</strong> are required.
    </Callout>
  )
}

function AllowedTeamSizes({ sizes }) {
  if (Array.isArray(sizes)) {
    return (
      <Callout>
        The selected team can have{' '}
        <strong>
          {sizes.map((size, i) => {
            if (i === 0) return size
            else if (i === sizes.length - 1) return ` or ${size} members.`
            else return `, ${size}`
          })}
        </strong>
      </Callout>
    )
  }

  if (typeof sizes === 'number') {
    return (
      <Callout>
        The selected team must have <strong>{sizes} members</strong>.
      </Callout>
    )
  }

  return (
    <Callout>
      The selected team’s size should range from{' '}
      <strong>
        {sizes.min} to {sizes.max} members
      </strong>
      .
    </Callout>
  )
}

function getMinMembersRequiredCount(sizes) {
  let minMembersRequired = 0

  if (Array.isArray(sizes)) {
    minMembersRequired = sizes[0]
  } else if (typeof sizes === 'number') {
    minMembersRequired = sizes
  } else {
    minMembersRequired = sizes.min
  }

  return minMembersRequired
}

function isTeamSizeValid(sizes, selectedCount) {
  if (Array.isArray(sizes)) return sizes.includes(selectedCount)

  if (typeof sizes === 'number') return sizes === selectedCount

  return sizes.min <= selectedCount && selectedCount <= sizes.max
}
