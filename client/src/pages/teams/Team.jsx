/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, memo, startTransition, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Icon } from '@iconify/react'
import calendarRemoveIcon from '@iconify-icons/mdi/calendar-remove'
import accountMultiplePlusIcon from '@iconify-icons/mdi/account-multiple-plus'
import { classNames } from '@arpansaha13/utils'
import { useAppContext } from '~/containers/DataProvider'
import { useFetch } from '~/hooks/useFetch'
import { useDebouncedFn } from '~/hooks/useDebouncedFn'
import BaseButton from '~base/BaseButton'
import Sheet from '~common/Sheet'
import Loader from '~common/Loader'
import Container from '~common/Container'
import EmptyState from '~common/EmptyState'
import TeamData from '~/components/Teams/TeamData'
import UserListItem from '~/components/Teams/UserListItem'
import { getTeamData } from '~loaders/teams.loader'

export const loader = getTeamData

const InviteModal = lazy(() => import('../../components/Teams/InviteModal'))
const PendingInvites = lazy(() => import('../../components/Teams/PendingInvites'))
const RegisteredTeamContestCard = lazy(() => import('../../components/Contests/RegisteredTeamContestCard'))

export function Component() {
  const fetchHook = useFetch()
  const { appContext } = useAppContext()
  const { team, members } = useLoaderData()
  const [pendingInvites, setPendingInvites] = useState([])
  const [loadingInvites, setLoadingInvites] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const isLeader = team.leader.user_id === appContext.user_id
  const isMember = useMemo(() => isLeader || members.findIndex(m => m.user_id === appContext.user_id) !== -1, [])

  useEffect(() => {
    if (isLeader) {
      fetchHook(`teams/${team.team_id}/pending-invites`).then(r => {
        setPendingInvites(r.data)
        startTransition(() => setLoadingInvites(false))
      })
    }
  }, [])

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
    <Container
      className={classNames('py-4', isLeader && 'grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-x-8 lg:gap-y-0')}
    >
      <main className={isLeader ? 'col-span-2' : 'mx-auto max-w-2xl'}>
        <div className='mb-6'>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-50'>{team.team_name}</h1>
          <p className='text-gray-400'>{team.team_id}</p>
        </div>

        <div className='space-y-6'>
          <Sheet className='px-6 py-4 space-y-3'>
            <TeamData team={team} />
          </Sheet>

          <div className='h-[42px] flex items-center justify-between'>
            <h2 className='text-xl lg:text-2xl font-bold text-gray-50'>
              <span className='hidden sm:inline'>Team </span>
              <span className='capitalize sm:lowercase'>members</span>
            </h2>

            {isLeader && (
              <BaseButton secondary onClick={() => setModalOpen(true)}>
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
              </BaseButton>
            )}
          </div>

          <TeamMembers members={members} />

          {isMember && <RegisteredContests teamId={team.team_id} />}
        </div>

        {isLeader && (
          <Suspense fallback={null}>
            <InviteModal
              open={modalOpen}
              setOpen={setModalOpen}
              teamId={team.team_id}
              inviteCall={inviteCall}
              withdrawInviteCall={withdrawInviteCall}
              refetchPendingInvites={refetchPendingInvites}
            />
          </Suspense>
        )}
      </main>

      {isLeader && (
        <section id='pending-invites'>
          <h3 className='mb-4 text-xl font-bold text-gray-50'>Pending invites</h3>

          {loadingInvites ? (
            <Loader className='w-6 mx-auto' />
          ) : (
            <PendingInvites
              pendingInvites={pendingInvites}
              inviteCall={inviteCall}
              withdrawInviteCall={withdrawInviteCall}
            />
          )}
        </section>
      )}
    </Container>
  )
}

Component.displayName = 'Team'

const TeamMembers = memo(({ members }) => (
  <Sheet className='px-6 py-4 space-y-3'>
    <ul className='grid grid-cols-1 sm:grid-cols-2 text-xs lg:text-sm'>
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

const RegisteredContests = memo(({ teamId }) => {
  const fetchHook = useFetch()
  const [loading, setLoading] = useState(true)
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    fetchHook(`teams/${teamId}/registered-contests`)
      .then(r => setRegistrations(r.data))
      .finally(() => {
        startTransition(() => setLoading(false))
      })
  }, [])

  const heading = (
    <div className='h-[42px] flex items-center'>
      <h2 className='text-xl lg:text-2xl font-bold text-gray-50'>Registered contests</h2>
    </div>
  )

  if (loading) {
    return (
      <>
        {heading}
        <Loader className='w-6 mx-auto' />
      </>
    )
  }

  return (
    <>
      {heading}

      {registrations.length > 0 ? (
        registrations.map(reg => <RegisteredTeamContestCard key={reg.id} reg={reg} />)
      ) : (
        <div className='mt-6'>
          <EmptyState icon={calendarRemoveIcon} title='Your team has not registered for any contest yet' />
          <p className='text-center'>
            <Link to='/contests' className='text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors'>
              Browse contests
            </Link>
          </p>
        </div>
      )}
    </>
  )
})
