import type { IconifyIcon } from '@iconify/react'
import { Invite } from '~/types'

export interface ReceivedInvitesProps {
  invites: Invite[]
}

export interface InviteListItemProps {
  invite: Invite
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
