/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import plusIcon from '@iconify-icons/mdi/plus'
import minusIcon from '@iconify-icons/mdi/minus'
import { useSet } from '../../hooks/useSet'
import { useFetch } from '../../hooks/useFetch'
import { useDebounce } from '../../hooks/useDebounce'
import BaseInput from '../../components/base/BaseInput'
import BaseButton from '../../components/base/BaseButton'
import Modal from '../../components/common/Modal'
import Sheet from '../../components/common/Sheet'
import Avatar from '../../components/common/Avatar'
import Container from '../../components/common/Container'
import classNames from '../../utils/classNames'

export default function Team() {
  const { team, members, pendingInvites: initialPendingInvites } = useLoaderData()
  const [pendingInvites, setPendingInvites] = useState(initialPendingInvites)
  const [modalOpen, setModalOpen] = useState(false)
  const fetchHook = useFetch()

  const refetchPendingInvites = useCallback(async () => {
    const res = await fetchHook(`invites/${team.team_id}`)
    setPendingInvites(res.data)
  }, [])

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
            <h2 className='text-xl lg:text-2xl font-bold text-gray-50'>Team members</h2>
            <BaseButton secondary onClick={() => setModalOpen(true)}>
              Invite
              <span className='hidden lg:inline'> members</span>
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

const InviteModal = ({ open, setOpen, teamId, inviteCall, withdrawInviteCall, refetchPendingInvites }) => {
  const fetchHook = useFetch()
  const isFirstRender = useRef(true)

  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loadingUserId, setLoading] = useState(null)

  const [, { add, delete: del, has: invited, clear }] = useSet()

  useEffect(() => {
    if (!open) {
      clear()
      setSearchString('')
      setSearchResults([])
    }
  }, [open])

  useDebounce(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      if (searchString === '') {
        setSearchResults([])
        return
      }
      fetchHook(`teams/${teamId}/search/uninvited-users?` + new URLSearchParams({ username: searchString })).then(
        res => {
          setSearchResults(res.data)
        }
      )
    },
    800,
    [searchString]
  )

  const invite = useCallback(async userId => {
    setLoading(userId)
    await inviteCall(userId)
    add(userId)
    setLoading(null)
    refetchPendingInvites()
  }, [])

  const withdrawInvite = useCallback(async userId => {
    setLoading(userId)
    await withdrawInviteCall(userId)
    del(userId)
    setLoading(null)
    refetchPendingInvites()
  }, [])

  return (
    <Modal open={open} setOpen={setOpen}>
      <Dialog.Title className='mb-4 text-base sm:text-xl text-white font-semibold'>Add team members</Dialog.Title>

      <BaseInput
        type='search'
        label='Search team members'
        srOnlyLabel
        placeholder='Search by username'
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />

      <div className='mt-3 h-60 lg:h-80 overflow-auto scrollbar'>
        <ul className='divide-y divide-amber-800/80 text-xs lg:text-sm'>
          {searchResults.map(user => (
            <li key={user.user_id}>
              <div className='sm:px-2 py-2 w-full text-left text-gray-100 flex items-center rounded-md'>
                <UserListItem user={user} />

                <div>
                  <InviteButton
                    loading={loadingUserId === user.user_id}
                    withdrawInvite={withdrawInvite}
                    invite={invite}
                    userId={user.user_id}
                    invited={invited(user.user_id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

const PendingInvites = memo(({ pendingInvites, inviteCall, withdrawInviteCall }) => {
  const [loadingUserId, setLoading] = useState(null)
  const [, { add, delete: del, has: invited, setAll }] = useSet(pendingInvites.map(inv => inv.user.user_id))

  useEffect(() => {
    setAll(pendingInvites.map(inv => inv.user.user_id))
  }, [pendingInvites])

  const invite = useCallback(async userId => {
    setLoading(userId)
    await inviteCall(userId)
    add(userId)
    setLoading(null)
  }, [])

  const withdrawInvite = useCallback(async userId => {
    setLoading(userId)
    await withdrawInviteCall(userId)
    del(userId)
    setLoading(null)
  }, [])

  return (
    <Sheet className='px-6 py-4'>
      <ul className='divide-y divide-amber-800/80 text-xs lg:text-sm'>
        {pendingInvites.map(inv => (
          <li key={inv.user.user_id} className='py-1.5 first:pt-0 last:pb-0'>
            <div className='text-gray-100 flex items-center'>
              <UserListItem user={inv.user} />

              <div>
                <InviteButton
                  loading={loadingUserId === inv.user.user_id}
                  withdrawInvite={withdrawInvite}
                  invite={invite}
                  userId={inv.user.user_id}
                  invited={invited(inv.user.user_id)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
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
