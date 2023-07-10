import { memo } from 'react'
import { classNames } from '@arpansaha13/utils'
import Loader from '../common/Loader'

const BaseButtonLoader = () => <Loader className='absolute w-6' />

const BaseButton = memo(
  ({ children, type = 'button', loading = false, disabled = false, stretch = false, secondary = false, ...attrs }) => {
    return (
      <button
        type={type}
        disabled={disabled || loading} // disable while loading
        {...attrs}
        className={classNames(
          'inline-flex justify-center rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2 transition-colors relative',
          !secondary
            ? 'text-white bg-amber-700 hover:bg-amber-800 border-transparent'
            : 'text-amber-600 bg-transparent hover:bg-amber-600/20 border-amber-600',
          disabled && 'opacity-70',
          stretch && 'w-full'
        )}
      >
        <div className={loading ? 'opacity-0' : ''}>{children}</div>
        {loading && <BaseButtonLoader />}
      </button>
    )
  }
)
export default BaseButton
