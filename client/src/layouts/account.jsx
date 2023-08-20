/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useState } from 'react'
import { NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { Icon } from '@iconify/react'
import checkIcon from '@iconify-icons/mdi/check'
import closeIcon from '@iconify-icons/mdi/close'
import accountClockIcon from '@iconify-icons/mdi/account-clock-outline'
import { classNames } from '@arpansaha13/utils'
import { useSet } from '../hooks/useSet'
import { useFetch } from '../hooks/useFetch'
import Sheet from '../components/common/Sheet'
import Loader from '../components/common/Loader'
import Container from '../components/common/Container'
import EmptyState from '../components/common/EmptyState'
import { profileTabs, accountTabs } from '../data/tabs'

function AccountLayout() {
  const { receivedInvites } = useLoaderData()

  return (
    <Container className='xl:!max-w-7xl py-4'>
      <div className='grid grid-cols-1 lg:grid-cols-11 gap-6'>
        {/* Desktop sidebar */}
        <aside className='hidden lg:block lg:col-span-2 text-white sticky top-4'>
          <ul className='space-y-2'>
            {profileTabs.map(tab => (
              <li key={tab.to}>
                <NavLink
                  to={tab.to}
                  className={({ isActive }) =>
                    classNames(
                      'block px-4 py-2 rounded-md text-sm',
                      isActive
                        ? 'bg-gradient-to-r from-amber-900'
                        : 'sm:hover:bg-gradient-to-r sm:hover:from-amber-900/40'
                    )
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
            {accountTabs.map(tab => (
              <li key={tab.to}>
                <NavLink
                  to={tab.to}
                  className={({ isActive }) =>
                    classNames(
                      'block px-4 py-2 rounded-md text-sm',
                      isActive
                        ? 'bg-gradient-to-r from-amber-900'
                        : 'sm:hover:bg-gradient-to-r sm:hover:from-amber-900/40'
                    )
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <div className='lg:col-span-6'>
          <Outlet />
        </div>

        <aside className='lg:col-span-3' id='received-invites'>
          <ReceivedInvites invites={receivedInvites} />
        </aside>
      </div>
    </Container>
  )
}
export default AccountLayout

const ReceivedInvites = ({ invites }) => {
  const fetchHook = useFetch()
  const loading = useSet()
  const [receivedInvites, setReceivedInvites] = useState(invites)

  const acceptInvite = useCallback(async id => {
    loading.add(id)
    await fetchHook(`invites/${id}/accept`, { method: 'PATCH' })
    loading.delete(id)
    // TODO: show link to team profile instead of deleting
    setReceivedInvites(arr => {
      const idx = arr.findIndex(inv => inv.id === id)
      arr.splice(idx, 1)
      return [...arr]
    })
  }, [])

  const rejectInvite = useCallback(id => {
    fetchHook(`invites/${id}/reject`, { method: 'PATCH' })
    setReceivedInvites(arr => {
      const idx = arr.findIndex(inv => inv.id === id)
      arr.splice(idx, 1)
      return [...arr]
    })
  }, [])

  const heading = <h3 className='mb-4 text-xl font-bold text-gray-50'>Received invites</h3>

  if (receivedInvites.length === 0) {
    return (
      <>
        {heading}
        <Sheet className='px-2 py-4'>
          <EmptyState icon={accountClockIcon} description='No invites received' />
        </Sheet>
      </>
    )
  }

  return (
    <>
      {heading}
      <Sheet className='px-2 py-4'>
        <ul className='px-4 divide-y divide-amber-800/80 text-xs lg:text-sm lg:max-h-96 lg:overflow-auto scrollbar'>
          {receivedInvites.map(inv => (
            <li key={inv.id} className='py-1.5 first:pt-0 last:pb-0'>
              <div className='text-gray-100 flex items-center space-x-2'>
                <InviteListItem invite={inv} />

                <AcceptButton id={inv.id} action={acceptInvite} loading={loading.has(inv.id)} />

                <RejectButton id={inv.id} action={rejectInvite} loading={false} />
              </div>
            </li>
          ))}
        </ul>
      </Sheet>
    </>
  )
}

const InviteListItem = ({ invite }) => (
  <div className='ml-1 lg:ml-2 flex-grow'>
    <p className='font-semibold'>{invite.team.team_name}</p>
    {/* <p className='text-gray-400'>{`@${invite.username}`}</p> */}
  </div>
)

const AcceptButton = memo(({ loading, action, id }) => (
  <div>
    <IconButton loading={loading} action={action} icon={checkIcon} id={id} desc='Accept' />
  </div>
))

const RejectButton = memo(({ loading, action, id }) => (
  <div>
    <IconButton loading={loading} action={action} icon={closeIcon} id={id} desc='Reject' />
  </div>
))

const IconButton = ({ loading, action, icon, id, desc }) => (
  <button
    type='button'
    disabled={loading}
    className='p-0.5 lg:p-1 flex items-center justify-center hover:bg-amber-900/60 text-amber-500 border border-amber-500 rounded-full transition-colors relative'
    onClick={() => action(id)}
  >
    <div className={classNames('w-5 h-5', loading && 'opacity-0')}>
      <Icon icon={icon} className='inline-block' color='inherit' width='100%' height='100%' />
    </div>

    <span className='sr-only'>{desc}</span>

    {loading && <Loader className='absolute w-3.5 xl:w-5' />}
  </button>
)
