import { startTransition, useMemo, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { classNames } from '@arpansaha13/utils'
import { useSet } from '~/hooks/useSet'
import { useFetch } from '~/hooks/useFetch'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import Callout from '~common/Callout'
import UserListItem from '../../../Teams/UserListItem'
import styles from './style.module.css'

export default function Register({ contest, team, members, alreadyRegisteredMemberIds, setRegistration }) {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(false)
  const [error, showError] = useState(false)
  const { add, delete: del, has, size: selectedCount, toArray } = useSet([])

  const minMembersRequired = getMinMembersRequiredCount(contest.allowedTeamSize)
  const hasAlreadyRegisteredMembers = alreadyRegisteredMemberIds.size > 0

  const { filteredMembers, alreadyRegisteredMembers } = useMemo(
    () => filterMembers(members, alreadyRegisteredMemberIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  function teamRegister(e) {
    e.preventDefault()

    if (error) return

    if (!isTeamSizeValid(contest.allowedTeamSize, selectedCount)) {
      showError(true)
      setTimeout(() => showError(false), 500)
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
    <Sheet className='p-4 sm:p-6'>
      <h2 className='mb-6 text-xl sm:text-2xl font-bold wrap-balance'>Register with {team.team_name}</h2>

      <div className='space-y-4'>
        {filteredMembers.length < minMembersRequired && (
          <ParticipationNotPossibleWarning minMembersRequired={minMembersRequired} />
        )}

        {hasAlreadyRegisteredMembers && <AlreadyRegisteredMembersInfo />}

        <h3 className='my-4 text-lg sm:text-xl font-bold'>Select members</h3>

        <div className='mb-4 text-xs sm:text-sm space-y-4'>
          <TeamMembers members={filteredMembers} add={add} del={del} has={has} />

          <ConditionalWrapper renderDisclosure={hasAlreadyRegisteredMembers}>
            <div className='flex flex-col sm:flex-row items-end sm:justify-between gap-1 sm:gap-0'>
              <p>Members selected: {selectedCount}</p>

              {hasAlreadyRegisteredMembers && (
                <Disclosure.Button className='block text-amber-600 hover:text-amber-500 font-medium transition-colors'>
                  {({ open }) => (open ? 'Hide registered members' : 'Show registered members')}
                </Disclosure.Button>
              )}
            </div>

            {hasAlreadyRegisteredMembers && (
              <Disclosure.Panel>
                <h3 className='mb-4 text-lg sm:text-xl font-bold'>Already registered members</h3>

                <AlreadyRegisteredMembers members={alreadyRegisteredMembers} />
              </Disclosure.Panel>
            )}
          </ConditionalWrapper>

          <div className='relative rounded overflow-hidden'>
            <AllowedTeamSizesInfo sizes={contest.allowedTeamSize} />

            <span className={classNames('absolute inset-0', error && styles['error'])} />
          </div>
        </div>

        <form className='ml-auto w-max' onSubmit={teamRegister}>
          <BaseButton type='submit' loading={loading}>
            Register
          </BaseButton>
        </form>
      </div>
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

function AlreadyRegisteredMembers({ members }) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs lg:text-sm'>
      {members.map(member => (
        <li
          key={member.user_id}
          className='p-1 w-full text-gray-100 text-left flex items-center rounded-sm sm:rounded select-none'
        >
          <UserListItem user={member} />
        </li>
      ))}
    </ul>
  )
}

function ParticipationNotPossibleWarning({ minMembersRequired }) {
  return (
    <Callout type='warning' className='not-prose wrap-balance'>
      Your team does not have enough members to participate in this contest. A minimum of{' '}
      <strong>{minMembersRequired} members</strong> are required.
    </Callout>
  )
}

function AlreadyRegisteredMembersInfo() {
  return (
    <Callout className='not-prose wrap-balance'>
      Some members are already registered in this contest from some other team. They are not shown in the list below.
    </Callout>
  )
}

function AllowedTeamSizesInfo({ sizes }) {
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

function ConditionalWrapper({ renderDisclosure, children }) {
  return renderDisclosure ? <Disclosure>{children}</Disclosure> : children
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

function filterMembers(members, alreadyRegisteredMemberIds) {
  const filteredMembers = []
  const alreadyRegisteredMembers = []

  for (const member of members) {
    if (alreadyRegisteredMemberIds.has(member.user_id)) alreadyRegisteredMembers.push(member)
    else filteredMembers.push(member)
  }

  return { filteredMembers, alreadyRegisteredMembers }
}
