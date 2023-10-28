export interface InviteModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  teamId: string
  inviteCall: (userId: string) => Promise<void>
  withdrawInviteCall: (userId: string) => Promise<void>
  refetchPendingInvites: () => void
}
