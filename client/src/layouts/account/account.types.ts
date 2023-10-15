import type { IconifyIcon } from '@iconify/react'

// FIXME: fix types

type Invite = any

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
