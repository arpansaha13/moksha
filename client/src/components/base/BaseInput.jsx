import { classNames } from '@arpansaha13/utils'

/*
  Props
  id: string
  label: string
  innerRef?: RefObject<HTMLInputElement>
  disabled?: boolean
  validationError?: string | null
*/

export default function BaseInput(props) {
  const { id, label, innerRef, validationError = null, disabled = false, srOnlyLabel = false, ...inputAttrs } = props

  return (
    <div className='relative'>
      <label htmlFor={id} className={classNames('block text-sm font-medium text-gray-100', srOnlyLabel && 'sr-only')}>
        {label}
      </label>
      <div className='mt-1'>
        <input
          id={id}
          disabled={disabled}
          ref={innerRef}
          {...inputAttrs}
          className={classNames(
            'block w-full appearance-none rounded-md  px-3 py-2 text-gray-50 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm',
            disabled ? 'bg-amber-900/50 border-none' : 'bg-amber-900/70 border border-gray-300 shadow-sm'
          )}
        />
      </div>
      {validationError !== null && (
        <p className='text-xs text-red-400 absolute -bottom-5 left-0.5'>{validationError}</p>
      )}
    </div>
  )
}
