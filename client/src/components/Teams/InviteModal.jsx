/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import accountSearchIcon from '@iconify-icons/mdi/account-search-outline'
import accountQuestionIcon from '@iconify-icons/mdi/account-question-outline'
import { useSet } from '~/hooks/useSet'
import { useFetch } from '~/hooks/useFetch'
import { useDebounce } from '~/hooks/useDebounce'
import BaseInput from '~base/BaseInput'
import Modal from '~common/Modal'
import Loader from '~common/Loader'
import UserListItem from './UserListItem'
import InviteButton from './InviteButton'

const INITIAL_MODAL_TEXT = 'Search users by their username to invite to the team'
const NO_RESULTS_MODAL_TEXT =
  "No users could be found by this username. Please note that team members and users who are already invited won't be shown here."

export default function InviteModal({ open, setOpen, teamId, inviteCall, withdrawInviteCall, refetchPendingInvites }) {
  const fetchHook = useFetch()
  const isFirstRender = useRef(true)

  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [modalIcon, setModalIcon] = useState(accountSearchIcon)
  const [modalText, setModalText] = useState(INITIAL_MODAL_TEXT)
  const [searching, setSearching] = useState(false)

  const loading = useSet()
  const invited = useSet()

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
          setSearchResults(res.data)
          if (res.data.length === 0) {
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

  const invite = useCallback(async userId => {
    loading.add(userId)
    await inviteCall(userId)
    invited.add(userId)
    loading.delete(userId)
    refetchPendingInvites()
  }, [])

  const withdrawInvite = useCallback(async userId => {
    loading.add(userId)
    await withdrawInviteCall(userId)
    invited.delete(userId)
    loading.delete(userId)
    refetchPendingInvites()
  }, [])

  return (
    <Modal open={open} setOpen={setOpen} maxWidth='sm'>
      <div className='mb-4 flex items-center justify-between'>
        <Dialog.Title className='text-base sm:text-xl text-white font-semibold'>Add team members</Dialog.Title>
        {searching && <Loader className='w-6 !border-amber-700' />}
      </div>

      <BaseInput
        type='search'
        label='Search team members'
        srOnlyLabel
        placeholder='Search by username'
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />

      <div className='mt-3 h-60 lg:h-72 overflow-auto scrollbar'>
        {searchResults.length > 0 ? (
          <ul className='divide-y divide-amber-800/80 text-xs lg:text-sm'>
            {searchResults.map(user => (
              <li key={user.user_id}>
                <div className='sm:px-2 py-2 w-full text-left text-gray-100 flex items-center rounded-md'>
                  <UserListItem user={user} />

                  <div>
                    <InviteButton
                      loading={loading.has(user.user_id)}
                      withdrawInvite={withdrawInvite}
                      invite={invite}
                      userId={user.user_id}
                      invited={invited.has(user.user_id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='w-full h-full flex items-center justify-center relative' aria-hidden>
            <div
              role='presentation'
              className='w-28 h-28 sm:w-32 sm:h-32 bg-amber-800 filter blur-xl absolute rounded-full'
            />
            <div className='relative z-10'>
              <div role='presentation' className='mx-auto w-20 h-20 sm:w-24 sm:h-24 text-brown rounded-full'>
                <Icon icon={modalIcon} className='block' color='inherit' width='100%' height='100%' />
              </div>
              <p className='text-xs sm:text-sm text-center text-gray-400 wrap-balance'>{modalText}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
