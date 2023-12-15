import { Disclosure } from '@headlessui/react'
import { classNames, isNullOrUndefined } from '@arpansaha13/utils'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import Callout from '~common/Callout'
import UserListItem from '~/components/Teams/UserListItem'
import { useTeamRegisterController } from './team-register.controller'
import styles from './style.module.css'
import type { TeamContest, User } from '~/types'
import type { TeamRegisterProps } from './team-register.types'

interface TeamMembersProps {
  members: User[]
  add: (value: User['id']) => void
  del: (value: User['id']) => void
  has: (value: User['id']) => boolean
}

interface AlreadyRegisteredMembers {
  members: User[]
}

interface ParticipationNotPossibleWarningProps {
  minMembersRequired: number
}

interface AllowedTeamSizesInfoProps {
  sizes: TeamContest['allowedTeamSize']
}

interface ConditionalWrapperProps {
  renderDisclosure: boolean
  children: React.ReactNode
}

export default function Register(props: Readonly<TeamRegisterProps>) {
  const { team, contest } = props

  const {
    error,
    loading,
    selectedMembers,
    filteredMembers,
    minMembersRequired,
    alreadyRegisteredMembers,
    hasAlreadyRegisteredMembers,
    teamRegister,
  } = useTeamRegisterController(props)

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
          <TeamMembers
            members={filteredMembers}
            add={selectedMembers.add}
            del={selectedMembers.delete}
            has={selectedMembers.has}
          />

          <ConditionalWrapper renderDisclosure={hasAlreadyRegisteredMembers}>
            <div className='flex flex-col sm:flex-row items-end sm:justify-between gap-1 sm:gap-0'>
              <p>Members selected: {selectedMembers.size}</p>

              {hasAlreadyRegisteredMembers && (
                <Disclosure.Button className='block text-amber-600 hover:text-amber-500 font-medium transition-colors'>
                  {({ open }) => <>{open ? 'Hide registered members' : 'Show registered members'}</>}
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

function TeamMembers({ members, add, del, has }: Readonly<TeamMembersProps>) {
  function toggle(userId: User['id']) {
    if (has(userId)) del(userId)
    else add(userId)
  }

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs lg:text-sm'>
      {members.map(member => (
        <li
          key={member.id}
          className={classNames(
            'rounded-sm sm:rounded select-none',
            has(member.id) ? 'bg-amber-800/60' : 'hover:bg-amber-800/30'
          )}
        >
          <button className='p-1 w-full text-gray-100 text-left flex items-center' onClick={() => toggle(member.id)}>
            <UserListItem user={member} />
          </button>
        </li>
      ))}
    </ul>
  )
}

function AlreadyRegisteredMembers({ members }: AlreadyRegisteredMembers) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs lg:text-sm'>
      {members.map(member => (
        <li
          key={member.id}
          className='p-1 w-full text-gray-100 text-left flex items-center rounded-sm sm:rounded select-none'
        >
          <UserListItem user={member} />
        </li>
      ))}
    </ul>
  )
}

function ParticipationNotPossibleWarning({ minMembersRequired }: ParticipationNotPossibleWarningProps) {
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

function AllowedTeamSizesInfo({ sizes }: AllowedTeamSizesInfoProps) {
  if (Array.isArray(sizes)) {
    return (
      <Callout>
        The selected team can have{' '}
        <strong>
          {sizes.map((size, i) => {
            if (i === 0) return size
            if (i === sizes.length - 1) return ` or ${size} members.`
            return `, ${size}`
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

  if (!isNullOrUndefined(sizes.min) && !isNullOrUndefined(sizes.max)) {
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

  if (!isNullOrUndefined(sizes.min)) {
    return (
      <Callout>
        The selected team should have at least <strong>{sizes.min} members</strong>.
      </Callout>
    )
  }

  if (!isNullOrUndefined(sizes.max)) {
    return (
      <Callout>
        The selected team should have at most <strong>{sizes.max} members</strong>.
      </Callout>
    )
  }

  // If none of them matches
  console.warn(`Invalid prop "sizes" of type ${typeof sizes}.`)
  return null
}

function ConditionalWrapper({ renderDisclosure, children }: ConditionalWrapperProps) {
  return renderDisclosure ? <Disclosure>{children}</Disclosure> : children
}
