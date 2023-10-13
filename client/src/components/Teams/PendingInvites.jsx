/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react'
import accountClockIcon from '@iconify-icons/mdi/account-clock-outline'
import { useSet } from '~/hooks/common/useSet'
import Sheet from '~common/Sheet'
import EmptyState from '~common/EmptyState'
import UserListItem from './UserListItem'
import InviteButton from './InviteButton'

export default function PendingInvites({ pendingInvites, inviteCall, withdrawInviteCall }) {
  const loading = useSet()
  const invited = useSet(pendingInvites.map(inv => inv.user.user_id))

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
}
