import { useCallback, useReducer } from 'react'

type Key = string | number | symbol

interface UseMapActionSet<T> {
  type: 'set'
  key: keyof T
  value: T[keyof T]
}

interface UseMapActionAll<T> {
  type: 'all'
  newValue: T
}

interface UseMapActionReset<T> {
  type: 'reset'
  initialValue: T
}

type UseMapAction<T> = UseMapActionSet<T> | UseMapActionAll<T> | UseMapActionReset<T>

function reducer<T>(state: T, action: UseMapAction<T>): T {
  const newState = { ...state }

  switch (action.type) {
    case 'set':
      newState[action.key] = action.value
      return newState
    case 'reset':
      return { ...action.initialValue }
    case 'all':
      return action.newValue
  }
}

export function useMap<T extends Record<Key, any>>(initialValue: T) {
  const [map, dispatch] = useReducer(reducer<T>, initialValue)

  const set = useCallback((key: keyof T, value: T[keyof T]) => {
    dispatch({ type: 'set', key, value })
  }, [])

  const setAll = useCallback((newValue: T) => {
    dispatch({ type: 'all', newValue })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'reset', initialValue })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [map, { set, setAll, reset }] as const
}
