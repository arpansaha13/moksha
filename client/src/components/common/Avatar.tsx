import { memo } from 'react'
import { Icon } from '@iconify/react'
import accountCircleIcon from '@iconify-icons/mdi/account-circle'
import { classNames } from '@arpansaha13/utils'

interface AvatarProps {
  avatarIdx: number
  className?: string
}

const avatarColors = Object.freeze([
  'text-red-500',
  'text-indigo-500',
  'text-sky-500',
  'text-fuchsia-500',
  'text-teal-500',
  'text-lime-500',
  'text-pink-500',
  'text-purple-500',
  'text-cyan-500',
  'text-green-500',
])

/**
 * The avatar will take up the full size of parent element.
 * Regulate the size by specifying that of <parent className="  "></parent>
 */
const Avatar = memo(({ avatarIdx, className }: AvatarProps) => {
  return (
    <div className={classNames('w-full h-full rounded-full', avatarColors[avatarIdx], className)}>
      <Icon icon={accountCircleIcon} className='block' color='inherit' width='100%' height='100%' />
    </div>
  )
})

export default Avatar
