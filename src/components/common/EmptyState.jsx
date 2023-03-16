import { memo } from "react"
import { Icon } from '@iconify/react'
import classNames from "../../utils/classNames"

const EmptyState = memo(({ icon, title, description }) => {

  return (
    <div className="flex flex-col items-center">
      {
        icon &&
        <div className="w-12 h-12 text-gray-400">
          <Icon icon={icon} className="block" color="inherit" width='100%' height='100%' />
        </div>
      }
      <p className={classNames('text-sm text-gray-100 font-semibold', icon && 'mt-4')}>
        {title}
      </p>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  )
})

export default EmptyState
