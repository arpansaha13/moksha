import { useState } from "react";

export function useList(initialValue) {
  const [list, setList] = useState(initialValue)

  const set = (index, value) => {
    setList(state => {
      const newState = [ ...state ]
      newState[index] = value
      return newState
    })
  }

  return [list, { set, setAll: setList }]
}
