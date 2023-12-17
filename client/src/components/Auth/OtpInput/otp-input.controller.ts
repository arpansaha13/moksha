import { createRef, useCallback, useEffect, useMemo, useState } from 'react'
import { useList } from '~/hooks/common/useList'
import type { OtpInputProps } from './otp-input.types'

const isEmpty = (val: string) => !val

export function useOtpInputController({ value, length, setValue }: OtpInputProps) {
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
  }, [length])

  const doFocus = useCallback(() => fieldRefs[activeField]!.current?.focus(), [fieldRefs, activeField])
  useEffect(doFocus, [activeField, doFocus])

  useEffect(() => {
    // Update original state whenever fields update
    setValue(fieldValues.join(''))
  }, [fieldValues, setValue])

  function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = e.target.value

    if (newVal.length > 1) return

    setFields(idx, newVal)

    setActiveField(state => {
      // If it is the last field, then stay there
      if (state === length - 1) return state

      // Go to next field if current field is not empty
      if (!isEmpty(newVal)) return state + 1

      // For first field, stay in the same field (here field is empty)
      if (state === 0) return state

      // Else go to previous field
      return state - 1
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

  return { fieldRefs, fieldValues, activeField, doFocus, handleChange, handleKeyDown }
}
