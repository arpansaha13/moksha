import { useState } from "react";

export function useMap(initialValue) {
  const [map, setMap] = useState(initialValue)

  const set = (key, value) => {
    setMap(state => {
      const newState = { ...state }
      newState[key] = value
      return newState
    })
  }

  return [map, { set, setAll: setMap }]
}