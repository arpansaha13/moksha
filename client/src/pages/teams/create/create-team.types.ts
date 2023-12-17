import type { NotificationMap } from '~/hooks/useNotification'

export interface CreateTeamFormProps {
  setShowNotification: (bool: boolean) => void
  setAllNotification: (newValue: NotificationMap) => void
}
