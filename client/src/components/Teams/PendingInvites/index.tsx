import accountClockIcon from '@iconify-icons/mdi/account-clock-outline'
import Sheet from '~common/Sheet'
import EmptyState from '~common/EmptyState'
import UserListItem from '../UserListItem'
import InviteButton from '../InviteButton'
import { usePendingInvitesController } from './pending-invites.controller'
import type { PendingInviteProps } from './pending-invites.types'

export default function PendingInvites(props: Readonly<PendingInviteProps>) {
  const { pendingInvites } = props
  const { loading, invited, doInvite, withdrawInvite } = usePendingInvitesController(props)

  if (pendingInvites.length === 0) {
    return (
      <Sheet className='px-2 py-4'>
        <EmptyState icon={accountClockIcon} description='No pending invites' />
      </Sheet>
    )
  }

  return (
    <Sheet className='px-2 py-4'>
      <ul className='px-4 divide-y divide-amber-800/80 text-xs lg:text-sm lg:max-h-96 lg:overflow-auto scrollbar'>
        {pendingInvites.map(inv => (
          <li key={inv.user.id} className='py-1.5 first:pt-0 last:pb-0'>
            <div className='text-gray-100 flex items-center'>
              <UserListItem user={inv.user} />

              <div>
                <InviteButton
                  loading={loading.has(inv.user.id)}
                  withdrawInvite={withdrawInvite}
                  doInvite={doInvite}
                  userId={inv.user.id}
                  invited={invited.has(inv.user.id)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Sheet>
  )
}
