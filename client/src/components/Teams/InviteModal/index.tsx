import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import BaseInput from '~base/BaseInput'
import Modal from '~common/Modal'
import Loader from '~common/Loader'
import UserListItem from '../UserListItem'
import InviteButton from '../InviteButton'
import { useInviteModalController } from './invite-modal.controller'
import type { InviteModalProps } from './invite-modal.types'

export default function InviteModal(props: Readonly<InviteModalProps>) {
  const { open, setOpen } = props

  const {
    loading,
    invited,
    searching,
    modalIcon,
    modalText,
    searchResults,
    searchString,
    doInvite,
    withdrawInvite,
    setSearchString,
  } = useInviteModalController(props)

  return (
    <Modal open={open} setOpen={setOpen} maxWidth='sm'>
      <div className='mb-4 flex items-center justify-between'>
        <Dialog.Title className='text-base sm:text-xl text-white font-semibold'>Add team members</Dialog.Title>
        {searching && <Loader className='w-6 !border-amber-700' />}
      </div>

      <BaseInput
        id='search'
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
              <li key={user.id}>
                <div className='sm:px-2 py-2 w-full text-left text-gray-100 flex items-center rounded-md'>
                  <UserListItem user={user} />

                  <div>
                    <InviteButton
                      loading={loading.has(user.id)}
                      withdrawInvite={withdrawInvite}
                      doInvite={doInvite}
                      userId={user.id}
                      invited={invited.has(user.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='w-full h-full flex items-center justify-center relative' aria-hidden>
            <div
              className='w-28 h-28 sm:w-32 sm:h-32 bg-amber-800 filter blur-xl absolute rounded-full'
              aria-hidden='true'
            />
            <div className='relative z-10'>
              <div className='mx-auto w-20 h-20 sm:w-24 sm:h-24 text-brown rounded-full' aria-hidden='true'>
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
