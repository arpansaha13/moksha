import { useState } from "react"

// interface UseListOptions {
//   maxLength?: number
//   minLength?: number
// }

export function useList(initialValue, options) {
  const minLength = options?.minLength
  const maxLength = options?.maxLength

  if (typeof minLength !== 'undefined' && initialValue.length < minLength) {
    throw new Error(`Length of list provided is less than the given "options.minLength: ${minLength}"`)
  }
  if (typeof maxLength !== 'undefined' && initialValue.length > maxLength) {
    throw new Error(`Length of list provided is more than the given "options.maxLength: ${maxLength}"`)
  }

  const [list, setList] = useState(initialValue)

  const set = (index, value) => {
    setList(state => {
      const newState = [ ...state ]
      newState[index] = value
      return newState
    })
  }

  const push = (value) => {
    if (typeof maxLength !== 'undefined' && list.length === maxLength) return

    setList(state => {
      const newState = [ ...state, value ]
      return newState
    })
  }

  const pop = (index) => {
    if (typeof minLength !== 'undefined' && list.length === minLength) return

    setList(state => {
      const newState = [ ...state ]

      if (typeof index !== 'undefined') newState.splice(index, 1)
      else newState.pop()

      return newState
    })
  }

  return [list, { set, push, pop, setAll: setList }]
}
