import { forwardRef } from 'react'
import { classNames } from '@arpansaha13/utils'
import Loader from '../common/Loader'

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  type?: 'button' | 'submit'
  loading?: boolean
  disabled?: boolean
  stretch?: boolean
  secondary?: boolean
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const {
    children,
    type = 'button',
    loading = false,
    disabled = false,
    stretch = false,
    secondary = false,
    ...attrs
  } = props

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading} // disable while loading
      {...attrs}
      className={classNames(
        'inline-flex justify-center rounded-md border py-1.5 sm:py-2 px-3.5 sm:px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2 transition-colors relative',
        !secondary
          ? 'text-white bg-amber-700 hover:bg-amber-800 border-transparent'
          : 'text-amber-600 bg-transparent hover:bg-amber-600/20 border-amber-600',
        disabled && 'opacity-70',
        stretch && 'w-full'
      )}
    >
      <div className={classNames('flex items-center', loading ? 'opacity-0' : '')}>{children}</div>
      {loading && <Loader className='absolute w-6' />}
    </button>
  )
})
export default BaseButton
