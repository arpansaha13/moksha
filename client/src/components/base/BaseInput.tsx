import { forwardRef } from 'react'
import { classNames } from '@arpansaha13/utils'

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  srOnlyLabel?: boolean
  disabled?: boolean
  validationError?: string | null
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const { id, label, validationError = null, disabled = false, srOnlyLabel = false, ...inputAttrs } = props

  return (
    <div className='relative'>
      <label htmlFor={id} className={classNames('block text-sm font-medium text-gray-100', srOnlyLabel && 'sr-only')}>
        {label}
      </label>
      <div className='mt-1'>
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          {...inputAttrs}
          className={classNames(
            'block w-full appearance-none rounded-md px-3 py-2 text-gray-50 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm',
            disabled ? 'bg-amber-900/50 border-none' : 'bg-amber-900/70 border border-gray-300 shadow-sm'
          )}
        />
      </div>
      {validationError !== null && <p className='text-xs text-red-400 absolute -bottom-5'>{validationError}</p>}
    </div>
  )
})

export default BaseInput
