/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react'
import { useSet } from '~/hooks/common/useSet'
import type { PendingInviteProps } from './pending-invites.types'
import type { User } from '~/types'

export function usePendingInvitesController({ pendingInvites, inviteCall, withdrawInviteCall }: PendingInviteProps) {
  const loading = useSet<User['id']>()
  const invited = useSet<User['id']>(pendingInvites.map(inv => inv.user.id))

  useEffect(() => {
    invited.setAll(pendingInvites.map(inv => inv.user.id))
  }, [pendingInvites])

  const doInvite = useCallback(async (userId: User['id']) => {
    loading.add(userId)
    await inviteCall(userId)
    invited.add(userId)
    loading.delete(userId)
  }, [])

  const withdrawInvite = useCallback(async (userId: User['id']) => {
    loading.add(userId)
    await withdrawInviteCall(userId)
    invited.delete(userId)
    loading.delete(userId)
  }, [])

  return { loading, invited, doInvite, withdrawInvite }
}
