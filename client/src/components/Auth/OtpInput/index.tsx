/* eslint-disable react-hooks/exhaustive-deps */
import { createRef, useCallback, useEffect, useMemo, useState } from 'react'
import { useList } from '~/hooks/useList'
import styles from './style.module.css'
import { classNames } from '@arpansaha13/utils'

interface OtpInputProps {
  value: string
  length: number
  label: string
  required?: boolean
  setValue: (value: string) => void
  validationError?: string | null
}

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
const isEmpty = (val: string) => !val

export default function OtpInput({ value, length, label, setValue, required = true, validationError }: OtpInputProps) {
  const initialValues = value.split('')

  if (initialValues.length > length) {
    throw new Error('[OtpInput] Invalid value or length')
  }
  const [activeField, setActiveField] = useState(Math.min(initialValues.length, length - 1))

  // Make array length equal to given length
  while (initialValues.length < length) initialValues.push('')

  const [fieldValues, { set: setFields }] = useList(initialValues)

  const fieldRefs = useMemo(() => {
    const arr = []
    for (let i = 0; i < length; i++) arr.push(createRef<HTMLInputElement>())
    return arr
  }, [])

  const doFocus = useCallback(() => fieldRefs[activeField]!.current?.focus(), [fieldRefs, activeField])
  useEffect(doFocus, [activeField])

  useEffect(() => {
    // Update original state whenever fields update
    setValue(fieldValues.join(''))
  }, [fieldValues])

  function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value

    if (newVal.length > 1) return

    setFields(idx, newVal)

    setActiveField(state => {
      if (isEmpty(newVal)) {
        switch (state) {
          case length - 1:
            return state
          case 0:
            return 0
          default:
            return state - 1
        }
      } else {
        // Go to next field
        return state === length - 1 ? state : state + 1
      }
    })
  }
  function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key
    if (key === 'Backspace' && isEmpty(fieldValues[idx]!) && idx !== 0) {
      e.preventDefault()
      setFields(idx - 1, '')
      setActiveField(state => state - 1)
    }
  }

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
