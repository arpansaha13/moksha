import { memo } from 'react'
import { Icon, type IconifyIcon } from '@iconify/react'
import { classNames } from '@arpansaha13/utils'

interface EmptyStateProps {
  icon?: IconifyIcon
  title?: string
  description?: string
}

const EmptyState = memo(({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className='flex flex-col items-center text-center wrap-balance'>
      {icon && (
        <div className='w-12 h-12 text-gray-400'>
          <Icon icon={icon} className='block' color='inherit' width='100%' height='100%' />
        </div>
      )}
      {title && <p className={classNames('text-sm text-gray-100 font-semibold', icon && 'mt-4')}>{title}</p>}
      {description && <p className='mt-1 text-sm text-gray-400'>{description}</p>}
    </div>
  )
})

export default EmptyState
