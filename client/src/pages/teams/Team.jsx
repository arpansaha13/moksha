/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify-icons/mdi/plus'
import minusIcon from '@iconify-icons/mdi/minus'
import accountClockIcon from '@iconify-icons/mdi/account-clock-outline'
import accountSearchIcon from '@iconify-icons/mdi/account-search-outline'
import accountQuestionIcon from '@iconify-icons/mdi/account-question-outline'
import accountMultiplePlusIcon from '@iconify-icons/mdi/account-multiple-plus'
import { useSet } from '../../hooks/useSet'
import { useFetch } from '../../hooks/useFetch'
import { useDebounce } from '../../hooks/useDebounce'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import Modal from '../../components/common/Modal'
import Sheet from '../../components/common/Sheet'
import Avatar from '../../components/common/Avatar'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import { classNames } from '@arpansaha13/utils'
import { useDebouncedFn } from '../../hooks/useDebouncedFn'

export default function Team() {
  const { team, members, pendingInvites: initialPendingInvites } = useLoaderData()
  const [pendingInvites, setPendingInvites] = useState(initialPendingInvites)
  const [modalOpen, setModalOpen] = useState(false)
  const fetchHook = useFetch()

  const refetchPendingInvites = useDebouncedFn(async () => {
    const res = await fetchHook(`invites/${team.team_id}`)
    setPendingInvites(res.data)
  }, 500)

  const inviteCall = useCallback(async userId => {
    await fetchHook('invites', {
      method: 'POST',
      body: JSON.stringify({
        team_id: team.team_id,
        user_id: userId,
      }),
    })
  }, [])

  const withdrawInviteCall = useCallback(async userId => {
    await fetchHook('invites', {
      method: 'DELETE',
      body: JSON.stringify({
        team_id: team.team_id,
        user_id: userId,
      }),
    })
  }, [])

  return (
    <Container className='py-4 grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-8 lg:gap-y-0'>
      <main className='col-span-2'>
        <h1 className='mb-6 text-3xl lg:text-4xl font-bold text-gray-50'>{team.team_name}</h1>

        <div className='space-y-6'>
          <TeamData team={team} />

          <div className='flex items-center justify-between'>
            <h2 className='text-xl lg:text-2xl font-bold text-gray-50'>
              <span className='hidden sm:inline'>Team </span>
              <span className='capitalize sm:lowercase'>members</span>
            </h2>
            <BaseButton secondary onClick={() => setModalOpen(true)}>
              <div className='flex items-center'>
                <div className='w-6 h-6'>
                  <Icon
                    icon={accountMultiplePlusIcon}
                    className='inline-block'
                    color='inherit'
                    width='100%'
                    height='100%'
                  />
                </div>
                <p className='ml-1.5'>
                  Invite <span className='hidden lg:inline'> members</span>
                </p>
              </div>
            </BaseButton>
          </div>

          <TeamMembers members={members} />
        </div>

        <InviteModal
          open={modalOpen}
          setOpen={setModalOpen}
          teamId={team.team_id}
          inviteCall={inviteCall}
          withdrawInviteCall={withdrawInviteCall}
          refetchPendingInvites={refetchPendingInvites}
        />
      </main>

      <section id='pending-invites'>
        <h3 className='mb-4 text-xl font-bold text-gray-50'>Pending invites</h3>
        <PendingInvites
          pendingInvites={pendingInvites}
          inviteCall={inviteCall}
          withdrawInviteCall={withdrawInviteCall}
        />
      </section>
    </Container>
  )
}

const TeamData = memo(({ team }) => (
  <Sheet className='px-6 py-4 space-y-3'>
    <div className='grid grid-cols-1 xs:grid-cols-2 gap-3 text-sm'>
      <div>
        <p className='font-semibold text-gray-400'>Leader</p>
        <p className='text-gray-100'>{team.leader_name}</p>
      </div>
      <div>
        <p className='font-semibold text-gray-400'>Leader id</p>
        <p className='text-gray-100'>{team.leader_id}</p>
      </div>
      <div>
        <p className='font-semibold text-gray-400'>Member count</p>
        <p className='text-gray-100'>{team.member_count}</p>
      </div>
    </div>
  </Sheet>
))

const TeamMembers = memo(({ members }) => (
  <Sheet className='px-6 py-4 space-y-3'>
    <ul className='divide-y divide-brown text-xs lg:text-sm'>
      {members.map(member => (
        <li key={member.user_id} className='py-1.5 first:pt-0 last:pb-0'>
          <div className='text-gray-100 flex items-center'>
            <UserListItem user={member} />
          </div>
        </li>
      ))}
    </ul>
  </Sheet>
))

const INITIAL_MODAL_TEXT = 'Search users to invite to the team'
const NO_RESULTS_MODAL_TEXT = 'No users could be found by this username.'

const InviteModal = ({ open, setOpen, teamId, inviteCall, withdrawInviteCall, refetchPendingInvites }) => {
  const fetchHook = useFetch()
  const isFirstRender = useRef(true)

  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [modalIcon, setModalIcon] = useState(accountSearchIcon)
  const [modalText, setModalText] = useState(INITIAL_MODAL_TEXT)
  const [searching, setSearching] = useState(false)

  const [, loading] = useSet([])
  const [, invited] = useSet([])

  useEffect(() => {
    if (!open) {
      invited.clear()
      setSearchString('')
      setSearchResults([])
    }
  }, [open])

  useDebounce(
    async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      if (searchString === '') {
        setSearchResults([])
        setModalIcon(accountSearchIcon)
        setModalText(INITIAL_MODAL_TEXT)
        return
      }
      setSearching(true)
      await fetchHook(`teams/${teamId}/search/uninvited-users?` + new URLSearchParams({ username: searchString })).then(
        res => {
          setSearchResults(res.data)
          if (res.data.length === 0) {
            setModalIcon(accountQuestionIcon)
            setModalText(NO_RESULTS_MODAL_TEXT)
          }
        }
      )
      setSearching(false)
    },
    800,
    [searchString]
  )

  const invite = useCallback(async userId => {
    loading.add(userId)
    await inviteCall(userId)
    invited.add(userId)
    loading.delete(userId)
    refetchPendingInvites()
  }, [])

  const withdrawInvite = useCallback(async userId => {
    loading.add(userId)
    await withdrawInviteCall(userId)
    invited.delete(userId)
    loading.delete(userId)
    refetchPendingInvites()
  }, [])

  return (
    <Modal open={open} setOpen={setOpen} maxWidth='sm'>
      <div className='mb-4 flex items-center justify-between'>
        <Dialog.Title className='text-base sm:text-xl text-white font-semibold'>Add team members</Dialog.Title>
        {searching && (
          <div className='w-6 xl:w-8 aspect-square border-y-2 border-amber-700 rounded-full animate-spin' />
        )}
      </div>

      <BaseInput
        type='search'
        label='Search team members'
        srOnlyLabel
        placeholder='Search by username'
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />

      <div className='mt-3 h-60 lg:h-72 overflow-auto scrollbar'>
        {searchResults.length > 0 ? (
          <ul className='divide-y divide-amber-800/80 text-xs lg:text-sm'>
            {searchResults.map(user => (
              <li key={user.user_id}>
                <div className='sm:px-2 py-2 w-full text-left text-gray-100 flex items-center rounded-md'>
                  <UserListItem user={user} />

                  <div>
                    <InviteButton
                      loading={loading.has(user.user_id)}
                      withdrawInvite={withdrawInvite}
                      invite={invite}
                      userId={user.user_id}
                      invited={invited.has(user.user_id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='w-full h-full flex items-center justify-center relative' aria-hidden>
            <div
              role='presentation'
              className='w-28 h-28 sm:w-32 sm:h-32 bg-amber-800 filter blur-xl absolute rounded-full'
            />
            <div className='relative z-10'>
              <div role='presentation' className='mx-auto w-20 h-20 sm:w-24 sm:h-24 text-brown rounded-full'>
                <Icon icon={modalIcon} className='block' color='inherit' width='100%' height='100%' />
              </div>
              <p className='text-xs sm:text-sm text-gray-400'>{modalText}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

const PendingInvites = memo(({ pendingInvites, inviteCall, withdrawInviteCall }) => {
  const [, loading] = useSet([])
  const [, invited] = useSet(pendingInvites.map(inv => inv.user.user_id))

  useEffect(() => {
    invited.setAll(pendingInvites.map(inv => inv.user.user_id))
  }, [pendingInvites])

  const invite = useCallback(async userId => {
    loading.add(userId)
    await inviteCall(userId)
    invited.add(userId)
    loading.delete(userId)
  }, [])

  const withdrawInvite = useCallback(async userId => {
    loading.add(userId)
    await withdrawInviteCall(userId)
    invited.delete(userId)
    loading.delete(userId)
  }, [])

  return (
    <Sheet className='px-2 py-4'>
      {pendingInvites.length === 0 ? (
        <EmptyState icon={accountClockIcon} description='No pending invites' />
      ) : (
        <ul className='px-4 divide-y divide-amber-800/80 text-xs lg:text-sm lg:max-h-96 lg:overflow-auto scrollbar'>
          {pendingInvites.map(inv => (
            <li key={inv.user.user_id} className='py-1.5 first:pt-0 last:pb-0'>
              <div className='text-gray-100 flex items-center'>
                <UserListItem user={inv.user} />

                <div>
                  <InviteButton
                    loading={loading.has(inv.user.user_id)}
                    withdrawInvite={withdrawInvite}
                    invite={invite}
                    userId={inv.user.user_id}
                    invited={invited.has(inv.user.user_id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  )
})

const UserListItem = ({ user }) => (
  <>
    <div className='w-9 h-9 lg:w-12 lg:h-12'>
      <Avatar avatarIdx={user.avatar_idx} />
    </div>

    <div className='ml-1 lg:ml-2 flex-grow'>
      <p className='font-semibold'>{user.name}</p>
      <p className='text-gray-400'>{`@${user.username}`}</p>
    </div>
  </>
)

const InviteButton = memo(({ loading, userId, invited, invite, withdrawInvite }) => (
  <button
    type='button'
    disabled={loading}
    className='p-0.5 lg:p-1 xl:px-2 xl:py-1 flex items-center justify-center hover:bg-amber-900/60 text-amber-500 border border-amber-500 rounded-full transition-colors relative'
    onClick={(invited ? withdrawInvite : invite).bind(this, userId)}
  >
    <div className={classNames('w-5 h-5', loading && 'opacity-0')}>
      <Icon icon={invited ? minusIcon : plusIcon} className='inline-block' color='inherit' width='100%' height='100%' />
    </div>

    <span className={classNames('hidden xl:inline-block ml-1 text-xs', loading && 'opacity-0')}>
      {invited ? 'Withdraw' : 'Invite'}
    </span>

    {loading && (
      <div className='absolute w-3.5 xl:w-5 aspect-square border-y-2 border-gray-50 rounded-full animate-spin' />
    )}
  </button>
))
