import { useState, useEffect } from 'react'

/**
 * A custom hook to conveniently use the `localStorage`.
 *
 * ### Usage
 *
 * ```js
 * const [value, setValue] = useLocalStorage('some-key')
 * console.log(value) // use the value corresponding to this key
 * setValue(newValue) // update the value of this key in the localStorage
 * ```
 *
 * @param {string} key
 * @returns value of given key in `localStorage`
 */
export function useLocalStorage(key) {
  const [value, setValue] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setValue(localStorage.getItem(key))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = newValue => {
    if (mounted) {
      localStorage.setItem(key, newValue)
      setValue(localStorage.getItem(key))
    }
  }

  return [value, set]
}
