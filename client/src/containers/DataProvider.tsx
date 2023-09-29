import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useMap } from '~/hooks/useMap'

interface DataProviderProps {
  children: ReactNode
}

interface AppContextData {
  authenticated: boolean
  user_id: string
  avatar_idx: number
}

interface AppContext {
  appContext: AppContextData
  setAppContext: (key: keyof AppContextData, value: string | number | boolean) => void
  resetAppContext: () => void
}

const data: AppContextData = {
  authenticated: false,
  user_id: '',
  avatar_idx: 0,
}

const DataContext = createContext<AppContext | null>(null)

const DataProvider = ({ children }: DataProviderProps) => {
  const [appContext, { set: setAppContext, reset: resetAppContext }] = useMap(data)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const providerContext = useMemo(() => ({ appContext, setAppContext, resetAppContext }), [appContext])

  return <DataContext.Provider value={providerContext}>{children}</DataContext.Provider>
}

export const useAppContext = () => {
  return useContext(DataContext)
}

export default DataProvider
