import { classNames } from '@arpansaha13/utils'

const color = {
  info: 'from-blue-300 to-blue-100/70 border-blue-600 text-blue-700',
  warning: 'from-yellow-300 to-yellow-100/60 border-yellow-700 text-yellow-800',
  error: 'from-rose-300 to-rose-100/60 border-rose-700 text-rose-800',
}

export default function Callout({ type = 'info', className = '', children }) {
  return (
    <div
      className={classNames(
        'px-3 sm:px-4 py-2 bg-gradient-to-r text-xs sm:text-sm font-medium border-l-4 rounded',
        color[type],
        className
      )}
    >
      {children}
    </div>
  )
}
