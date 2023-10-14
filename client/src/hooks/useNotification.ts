import { useMap } from './common/useMap'
import type { NotificationStatus } from '~/components/common/Notification'

export interface NotificationMap {
  show: boolean
  title: string
  description: string
  status: NotificationStatus
}

export function useNotification() {
  const [notification, { set, setAll, reset }] = useMap<NotificationMap>({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  return [notification, { set, setAll, reset }] as const
}
