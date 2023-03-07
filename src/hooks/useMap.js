import { useCallback, useReducer } from "react"


function reducer(state, action) {
  const key = action.key
  const value = action.value
  const newState = {...state}

  switch (action.type) {
    case 'set':
      newState[key] = value
      break
    case 'reset':
      return {...action.initialValue}
    case 'all':
      return action.newMap
    default:
      throw Error('Unknown action: ' + action.type)
  }

  return newState
}

export function useMap(initialValue) {
  const [map, dispatch] = useReducer(reducer, initialValue)

  const set = useCallback((key, value) => {
    dispatch({ type: 'set', key, value })
  }, [])

  const setAll = useCallback((newMap) => {
    dispatch({ type: 'all', newMap })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'reset', initialValue })
  }, [])

  return [map, { set, setAll, reset }]
}
