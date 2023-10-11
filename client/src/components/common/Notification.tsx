import { Fragment, memo, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { Transition } from '@headlessui/react'
import closeIcon from '@iconify-icons/mdi/close'
import checkIcon from '@iconify-icons/mdi/check-circle-outline'
import { classNames, isNullOrUndefined } from '@arpansaha13/utils'

export type NotificationStatus = 'success' | 'error'

interface NotificationProps {
  title: string
  description: string
  show: boolean
  setShow: (bool: boolean) => void
  timeout?: number
  className?: string
  status?: NotificationStatus
}

const Notification = memo(
  ({ title, description, show, setShow, timeout, className, status = 'success' }: NotificationProps) => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      if (show && !isNullOrUndefined(timeout) && timeoutId.current === null) {
        if (isNullOrUndefined(setShow)) {
          throw new Error('A timeout is provided but no setShow function is provided.')
        }

        timeoutId.current = setTimeout(() => {
          setShow(false)
          timeoutId.current = null
        }, timeout * 1000)

        return () => {
          if (timeoutId.current !== null) clearTimeout(timeoutId.current)
          setShow(false)
        }
      }
      return () => {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    return (
      <div
        aria-live='assertive'
        className={classNames('pointer-events-none fixed inset-0 z-40 flex items-start px-4 py-6 sm:p-6', className)}
      >
        <div className='w-full flex flex-col items-center space-y-4'>
          <Transition
            show={show}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-yellow-900 shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='p-4'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    {status === 'success' ? (
                      <div className='h-7 w-7 text-green-500' aria-hidden='true'>
                        <Icon icon={checkIcon} className='block' color='inherit' width='100%' height='100%' />
                      </div>
                    ) : (
                      <div className='h-7 w-7 text-red-600' aria-hidden='true'>
                        <ExclamationCircle className='w-full h-full' />
                      </div>
                    )}
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-medium text-gray-100'>{title}</p>
                    <p className='mt-1 text-sm text-gray-400'>{description}</p>
                  </div>
                  <div className='ml-4 flex flex-shrink-0'>
                    <button
                      type='button'
                      className='inline-flex rounded-md bg-yellow-900 text-amber-500 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2'
                      onClick={() => setShow(false)}
                    >
                      <span className='sr-only'>Close</span>
                      <div className='h-5 w-5' aria-hidden='true'>
                        <Icon icon={closeIcon} className='block' color='inherit' width='100%' height='100%' />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    )
  }
)

export default Notification

const ExclamationCircle = ({ className }: { className: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
    />
  </svg>
)
