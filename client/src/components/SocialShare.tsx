import { useCallback, useMemo, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Icon } from '@iconify/react'
import copyIcon from '@iconify-icons/mdi/content-copy'
import copiedIcon from '@iconify-icons/mdi/file-document-check-outline'
import { classNames } from '@arpansaha13/utils'
import Modal from './common/Modal'

interface SocialShareProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  data: {
    url: string
    title: string
    text: string
  }
  children: React.ReactNode
}

/** A width and height needs to be specified from parent */
export default function SocialShare({ data, children, ...attrs }: SocialShareProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const openModal = () => setModalOpen(true)

  const shareUrl = useMemo(() => {
    const path = data.url.startsWith('/') ? data.url : `/${data.url}`
    return window.location.origin + path
  }, [data.url])

  const shareText = useMemo(
    // trim to 2000 characters
    () => (data.text.length <= 100 ? data.text.length : `${data.text.substr(0, 200)}...`),
    [data.text]
  )

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 4000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareUrl])

  const social = useMemo(
    () => [
      {
        name: 'WhatsApp',
        logo: '/logos/whatsapp.svg',
        href: `https://api.whatsapp.com/send/?text=${encodeURIComponent(data.title)}%0A%0A${encodeURIComponent(
          shareUrl
        )}%0A%0A${encodeURIComponent(shareText)}`,
      },
      {
        name: 'Facebook',
        logo: '/logos/facebook.svg',
        href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.title, data.text, shareUrl]
  )

  return (
    <>
      <button type='button' {...attrs} onClick={openModal}>
        {children}
      </button>

      <Modal open={modalOpen} setOpen={setModalOpen} maxWidth='xs'>
        <Dialog.Title className='mb-4 text-base lg:text-xl text-white font-semibold'>Share</Dialog.Title>

        <div className='divide-y divide-amber-900'>
          <div className='grid grid-cols-3 2xs:grid-cols-2 gap-4'>
            {social.map(item => (
              <a
                key={item.name}
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='p-4 flex bg-amber-900/60 hover:bg-amber-800/50 shadow shadow-amber-900 rounded-md transition-colors'
              >
                <div className='m-auto w-full h-full 2xs:w-16 2xs:h-16'>
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
                  'm-auto p-1 w-full h-full 2xs:w-16 2xs:h-16',
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
}
