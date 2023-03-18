import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import copyIcon from '@iconify-icons/mdi/content-copy'
import copiedIcon from '@iconify-icons/mdi/file-document-check-outline'
import Modal from './common/Modal'
import classNames from '../utils/classNames'

/** A width and height needs to be specified from parent */
const SocialShare = memo(({ data, children }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const locationOrigin = useRef('')

  const openModal = useCallback(() => setModalOpen(true), [])

  useEffect(() => {
    locationOrigin.current = window.location.origin
  }, [])

  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(locationOrigin.current + data.url)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 4000)
  }, [])

  const social = useMemo(
    () => [
      {
        name: 'WhatsApp',
        logo: '/static/logos/whatsapp.svg',
        href: `https://api.whatsapp.com/send/?text=${encodeURIComponent(data.title)}%0A%0A${encodeURIComponent(
          locationOrigin.current + data.url
        )}%0A%0A${encodeURIComponent(data.text)}`,
      },
      {
        name: 'Facebook',
        logo: '/static/logos/facebook.svg',
        href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(locationOrigin.current + data.url)}`,
      },
    ],
    [data, locationOrigin]
  )

  return (
    <>
      <button type='button' onClick={openModal}>
        {children}
      </button>

      <Modal open={modalOpen} setOpen={setModalOpen} maxWidth='xs'>
        <Dialog.Title className='mb-4 text-base lg:text-xl text-white font-semibold'>Share</Dialog.Title>

        <div className='divide-y divide-amber-900'>
          <div className='grid grid-cols-3 xs:grid-cols-2 gap-4'>
            {social.map(item => (
              <a
                key={item.name}
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='p-4 flex bg-amber-900/60 hover:bg-amber-800/50 shadow shadow-amber-900 rounded-md transition-colors'
              >
                <div className='m-auto w-full h-full xs:w-16 xs:h-16'>
                  <img src={item.logo} alt={`${item.name} Logo`} className='w-full h-full' aria-hidden />
                </div>
                <span className='sr-only'>Share on {item.name}</span>
              </a>
            ))}

            <button
              type='button'
              disabled={copied}
              className='p-4 flex bg-amber-900/60 hover:bg-amber-800/50 shadow-sm shadow-amber-900 rounded-md transition-colors'
              onClick={copyToClipboard}
            >
              <div
                className={classNames(
                  'm-auto p-1 w-full h-full xs:w-16 xs:h-16',
                  copied ? 'text-sky-500 transform rotate-6' : 'text-gray-100'
                )}
              >
                <Icon
                  icon={copied ? copiedIcon : copyIcon}
                  className='block'
                  color='inherit'
                  width='100%'
                  height='100%'
                  aria-hidden
                />
              </div>
              <span className='sr-only'>Copy link</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
})
export default SocialShare
