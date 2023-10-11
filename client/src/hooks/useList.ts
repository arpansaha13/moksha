/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useReducer } from 'react'

interface UseListOptions {
  minLength?: number
  maxLength?: number
}

interface UseListActionSet<T> {
  type: 'set'
  index: number
  value: T
}

interface UseListActionPush<T> {
  type: 'push'
  value: T
}

interface UseListActionPop {
  type: 'pop'
  index?: number
}

interface UseListActionAll<T> {
  type: 'all'
  newList: T[]
}

type UseListAction<T> = UseListActionSet<T> | UseListActionPush<T> | UseListActionPop | UseListActionAll<T>

function reducer<T>(state: T[], action: UseListAction<T>) {
  const newState = [...state]

  switch (action.type) {
    case 'set':
      newState[action.index] = action.value
      break
    case 'push':
      newState.push(action.value)
      break
    case 'pop':
      if (typeof action.index !== 'undefined') newState.splice(action.index, 1)
      else newState.pop()
      break
    case 'all':
      return action.newList
  }

  return newState
}

export function useList<T = unknown>(initialValue: T[], options?: UseListOptions) {
  const minLength = options?.minLength
  const maxLength = options?.maxLength

  if (typeof minLength !== 'undefined' && initialValue.length < minLength) {
    throw new Error(`Length of list provided is less than the given "options.minLength: ${minLength}"`)
  }
  if (typeof maxLength !== 'undefined' && initialValue.length > maxLength) {
    throw new Error(`Length of list provided is more than the given "options.maxLength: ${maxLength}"`)
  }

  const [list, dispatch] = useReducer(reducer<T>, initialValue)

  const set = useCallback((index: number, value: T) => {
    dispatch({ type: 'set', index, value })
  }, [])

  const push = useCallback(
    (value: T) => {
      if (typeof maxLength !== 'undefined' && list.length === maxLength) return

      dispatch({ type: 'push', value })
    },
    [list]
  )

  const pop = useCallback(
    (index: number) => {
      if (typeof minLength !== 'undefined' && list.length === minLength) return

      dispatch({ type: 'pop', index })
    },
    [list]
  )

  const setAll = useCallback((newList: T[]) => {
    dispatch({ type: 'all', newList })
  }, [])

  return [list, { set, push, pop, setAll }] as const
}
