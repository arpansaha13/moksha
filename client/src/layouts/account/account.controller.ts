/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'
import { useSet } from '~/hooks/common/useSet'
import { useFetch } from '~/hooks/common/useFetch'
import type { UserReceivedInvite } from '~/types'
import type { ReceivedInvitesProps } from './account.types'

export function useReceivedInvitesController({ invites }: ReceivedInvitesProps) {
  const fetchHook = useFetch()
  const loading = useSet()
  const [receivedInvites, setReceivedInvites] = useState<UserReceivedInvite[]>(invites)

  const acceptInvite = useCallback(async (id: number) => {
    loading.add(id)
    await fetchHook(`invites/${id}/accept`, { method: 'PATCH' })
    loading.delete(id)

    // TODO: show link to team profile instead of deleting
    setReceivedInvites((arr: any[]) => {
      const idx = arr.findIndex(inv => inv.id === id)
      arr.splice(idx, 1)
      return [...arr]
    })
  }, [])

  const rejectInvite = useCallback((id: number) => {
    fetchHook(`invites/${id}/reject`, { method: 'PATCH' })
    setReceivedInvites((arr: any[]) => {
      const idx = arr.findIndex(inv => inv.id === id)
      arr.splice(idx, 1)
      return [...arr]
    })
  }, [])

  return { receivedInvites, loading, acceptInvite, rejectInvite }
}
