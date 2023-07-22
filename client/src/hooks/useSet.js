import { useCallback, useReducer } from 'react'

function reducer(state, action) {
  const value = action.value
  const newState = new Set(state)

  switch (action.type) {
    case 'add':
      newState.add(value)
      break
    case 'delete':
      newState.delete(value)
      break
    case 'clear':
      return new Set()
    case 'all':
      return new Set(action.newSet)
    default:
      throw Error('Unknown action: ' + action.type)
  }

  return newState
}

export function useSet(initialValues = []) {
  const [set, dispatch] = useReducer(reducer, new Set(initialValues))

  const add = useCallback(value => {
    dispatch({ type: 'add', value })
  }, [])

  const del = useCallback(value => {
    dispatch({ type: 'delete', value })
  }, [])

  const has = useCallback(value => set.has(value), [set])

  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const setAll = useCallback(newSet => {
    dispatch({ type: 'all', newSet })
  }, [])

  const toArray = useCallback(() => Array.from(set), [set])

  return { add, delete: del, has, clear, setAll, size: set.size, toArray }
}
