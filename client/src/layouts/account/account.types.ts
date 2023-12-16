import type { IconifyIcon } from '@iconify/react'
import type { UserReceivedInvite } from '~/types'

export interface ReceivedInvitesProps {
  invites: UserReceivedInvite[]
}

export interface InviteListItemProps {
  invite: UserReceivedInvite
}

export interface AcceptRejectButtonProps {
  id: number
  action: (id: number) => void | Promise<void>
}

export interface IconButtonProps {
  action: (id: number) => void | Promise<void>
  icon: IconifyIcon
  id: number
  desc: 'Accept' | 'Reject'
}
