import { createContext, useContext, useMemo } from 'react'
import { useMap } from '../hooks/useMap'

const data = {
  authenticated: false,
  user_id: '',
  avatar_idx: 0,
}

const DataContext = createContext(null)

const DataProvider = ({ children }) => {
  const [appContext, { set: setAppContext, reset: resetAppContext }] = useMap(data)

  const providerContext = useMemo(() => ({ appContext, setAppContext, resetAppContext }), [appContext])

  return <DataContext.Provider value={providerContext}>{children}</DataContext.Provider>
}

export const useAppContext = () => {
  return useContext(DataContext)
}

export default DataProvider
