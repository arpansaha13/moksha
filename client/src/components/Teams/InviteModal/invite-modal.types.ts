import type { User } from '~/types'

export interface InviteModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  teamId: string
  inviteCall: (userId: User['id']) => Promise<void>
  withdrawInviteCall: (userId: User['id']) => Promise<void>
  refetchPendingInvites: () => void
}
