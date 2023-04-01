import { Fragment, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classNames from '../../utils/classNames'

const maxWidths = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
}

const Modal = ({ open, setOpen, children, onClose, maxWidth = 'lg' }) => {
  const doOnClose = useCallback(
    bool => {
      setOpen(bool)
      onClose?.()
    },
    [onClose]
  )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' onClose={doOnClose} className='relative z-40'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-darkBrown/75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className={classNames(
                  'relative sm:my-8 w-full max-w-xs overflow-hidden rounded-lg bg-brown text-left shadow-xl transform transition-all',
                  maxWidths[maxWidth]
                )}
              >
                <div className='px-4 pt-5 pb-4 sm:p-6 bg-amber-900/30'>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Modal
