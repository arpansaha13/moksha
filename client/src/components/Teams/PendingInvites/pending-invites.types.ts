import type { TeamPendingInvite, User } from '~/types'

export interface PendingInviteProps {
  pendingInvites: TeamPendingInvite[]
  inviteCall: (userId: User['id']) => Promise<void>
  withdrawInviteCall: (userId: User['id']) => Promise<void>
}
