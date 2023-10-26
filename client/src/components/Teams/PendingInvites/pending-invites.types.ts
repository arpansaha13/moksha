import type { Invite } from '~/types'

export interface PendingInviteProps {
  pendingInvites: Invite[]
  inviteCall: (userId: string) => Promise<void>
  withdrawInviteCall: (userId: string) => Promise<void>
}
