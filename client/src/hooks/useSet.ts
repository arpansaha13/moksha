import { useCallback, useReducer } from 'react'

interface UseSetActionAddDelete<T> {
  type: 'add' | 'delete'
  value: T
}

interface UseSetActionAll<T> {
  type: 'all'
  newValues: T[]
}

interface UseSetActionClear {
  type: 'clear'
}

type UseSetAction<T> = UseSetActionAddDelete<T> | UseSetActionAll<T> | UseSetActionClear

function reducer<T>(state: Set<T>, action: UseSetAction<T>): Set<T> {
  const newState = new Set(state)

  switch (action.type) {
    case 'add':
      newState.add(action.value)
      return newState
    case 'delete':
      newState.delete(action.value)
      return newState
    case 'clear':
      return new Set()
    case 'all':
      return new Set(action.newValues)
  }
}

export function useSet<T = any>(initialValues: T[] = []) {
  const [set, dispatch] = useReducer(reducer<T>, new Set(initialValues))

  const add = useCallback((value: T) => {
    dispatch({ type: 'add', value })
  }, [])

  const del = useCallback((value: T) => {
    dispatch({ type: 'delete', value })
  }, [])

  const has = useCallback((value: T) => set.has(value), [set])

  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const setAll = useCallback((newValues: T[]) => {
    dispatch({ type: 'all', newValues })
  }, [])

  const toArray = useCallback(() => Array.from(set), [set])

  return { add, delete: del, has, clear, setAll, size: set.size, toArray }
}
