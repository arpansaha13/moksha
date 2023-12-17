/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import accountSearchIcon from '@iconify-icons/mdi/account-search-outline'
import accountQuestionIcon from '@iconify-icons/mdi/account-question-outline'
import { useSet } from '~/hooks/common/useSet'
import { useFetch } from '~/hooks/common/useFetch'
import { useDebounce } from '~/hooks/common/useDebounce'
import type { User } from '~/types'
import type { InviteModalProps } from './invite-modal.types'

const INITIAL_MODAL_TEXT = 'Search users by their username to invite to the team'
const NO_RESULTS_MODAL_TEXT =
  "No users could be found by this username. Please note that team members and users who are already invited won't be shown here."

export function useInviteModalController({
  open,
  teamId,
  inviteCall,
  withdrawInviteCall,
  refetchPendingInvites,
}: Readonly<InviteModalProps>) {
  const fetchHook = useFetch()
  const isFirstRender = useRef(true)

  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [modalIcon, setModalIcon] = useState(accountSearchIcon)
  const [modalText, setModalText] = useState(INITIAL_MODAL_TEXT)
  const [searching, setSearching] = useState(false)

  const loading = useSet<User['id']>()
  const invited = useSet<User['id']>()

  useEffect(() => {
    if (!open) {
      invited.clear()
      setSearchString('')
      setSearchResults([])
    }
  }, [open])

  useDebounce(
    async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      if (searchString === '') {
        setSearchResults([])
        setModalIcon(accountSearchIcon)
        setModalText(INITIAL_MODAL_TEXT)
        return
      }
      setSearching(true)
      await fetchHook(`teams/${teamId}/search/uninvited-users?` + new URLSearchParams({ username: searchString })).then(
        res => {
          setSearchResults(res)
          if (res.length === 0) {
            setModalIcon(accountQuestionIcon)
            setModalText(NO_RESULTS_MODAL_TEXT)
          }
        }
      )
      setSearching(false)
    },
    800,
    [searchString]
  )

  const doInvite = useCallback(async (userId: User['id']) => {
    loading.add(userId)
    await inviteCall(userId)
    invited.add(userId)
    loading.delete(userId)
    refetchPendingInvites()
  }, [])

  const withdrawInvite = useCallback(async (userId: User['id']) => {
    loading.add(userId)
    await withdrawInviteCall(userId)
    invited.delete(userId)
    loading.delete(userId)
    refetchPendingInvites()
  }, [])

  return {
    loading,
    invited,
    searching,
    modalIcon,
    modalText,
    searchString,
    searchResults,
    doInvite,
    withdrawInvite,
    setSearchString,
  }
}
