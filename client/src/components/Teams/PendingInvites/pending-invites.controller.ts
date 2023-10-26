/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react'
import { useSet } from '~/hooks/common/useSet'
import type { PendingInviteProps } from './pending-invites.types'

export function usePendingInvitesController({ pendingInvites, inviteCall, withdrawInviteCall }: PendingInviteProps) {
  const loading = useSet<string>()
  const invited = useSet<string>(pendingInvites.map(inv => inv.user.user_id))

  useEffect(() => {
    invited.setAll(pendingInvites.map(inv => inv.user.user_id))
  }, [pendingInvites])

  const doInvite = useCallback(async (userId: string) => {
    loading.add(userId)
    await inviteCall(userId)
    invited.add(userId)
    loading.delete(userId)
  }, [])

  const withdrawInvite = useCallback(async (userId: string) => {
    loading.add(userId)
    await withdrawInviteCall(userId)
    invited.delete(userId)
    loading.delete(userId)
  }, [])

  return { loading, invited, doInvite, withdrawInvite }
}
