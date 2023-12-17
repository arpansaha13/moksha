import styles from './style.module.css'
import { classNames } from '@arpansaha13/utils'
import { useOtpInputController } from './otp-input.controller'
import type { OtpInputProps } from './otp-input.types'

const fieldAttrs = Object.freeze({
  type: 'text',
  min: 0,
  max: 9,
  inputMode: 'numeric',
  pattern: '[0-9]{1}',
  title: 'Only numbers are allowed',
  className: classNames(
    styles['otp-field'],
    'block w-full appearance-none rounded-md px-3 py-2 text-center text-xl placeholder-gray-400 bg-amber-900/70 border border-gray-300 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500'
  ),
})

export default function OtpInput(props: OtpInputProps) {
  const { fieldValues, fieldRefs, activeField, doFocus, handleChange, handleKeyDown } = useOtpInputController(props)
  const { label, required = true, validationError } = props

  return (
    <div className='relative'>
      <label className='block text-sm font-medium text-gray-100'>{label}</label>
      <div className='mt-1'>
        <div className='flex justify-between items-center gap-4' onClick={doFocus}>
          {fieldValues.map((value, i) => (
            <input
              key={i}
              ref={fieldRefs[i]}
              {...fieldAttrs}
              required={required}
              disabled={i !== activeField}
              value={value}
              onChange={e => handleChange(i, e)}
              onKeyDown={e => handleKeyDown(i, e)}
            />
          ))}
        </div>
      </div>
      {validationError !== null && (
        <p className='text-xs text-red-400 absolute -bottom-5 left-0.5'>{validationError}</p>
      )}
    </div>
  )
}
