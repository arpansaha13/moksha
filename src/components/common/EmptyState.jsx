import { memo } from "react"
import { Icon } from '@iconify/react'

const EmptyState = memo(({ icon, title, description }) => {

  return (
    <div className="flex flex-col items-center space-y-1">
      {
        icon &&
        <div className="w-12 h-12 text-gray-400">
          <Icon icon={icon} className="block" color="inherit" width='100%' height='100%' />
        </div>
      }
      <p className="text-sm text-gray-100 font-semibold">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
})

export default EmptyState
