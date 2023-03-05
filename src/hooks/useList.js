/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useReducer } from "react"

function reducer(state, action) {
  const index = action.index
  const value = action.value
  const newState = [...state]

  switch (action.type) {
    case 'set':
      newState[index] = value
      break
    case 'push':
      newState.push(value)
      break
    case 'pop':
      if (typeof index !== 'undefined') newState.splice(index, 1)
      else newState.pop()
      break
    case 'all':
      return action.newList
    default:
      throw Error('Unknown action: ' + action.type)
  }

  return newState
}

export function useList(initialValue, options) {
  const minLength = options?.minLength
  const maxLength = options?.maxLength

  if (typeof minLength !== 'undefined' && initialValue.length < minLength) {
    throw new Error(`Length of list provided is less than the given "options.minLength: ${minLength}"`)
  }
  if (typeof maxLength !== 'undefined' && initialValue.length > maxLength) {
    throw new Error(`Length of list provided is more than the given "options.maxLength: ${maxLength}"`)
  }

  const [list, dispatch] = useReducer(reducer, initialValue)

  const set = useCallback((index, value) => {
    dispatch({ type: 'set', index, value })
  }, [])

  const push = useCallback((value) => {
    if (typeof maxLength !== 'undefined' && list.length === maxLength) return

    dispatch({ type: 'push', value })
  }, [])

  const pop = useCallback((index) => {
    if (typeof minLength !== 'undefined' && list.length === minLength) return

    dispatch({ type: 'pop', index })
  }, [])

  const setAll = useCallback((newList) => {
    dispatch({ type: 'all', newList })
  }, [])

  return [list, { set, push, pop, setAll }]
}
