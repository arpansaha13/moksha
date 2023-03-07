import { createContext, useContext, useMemo } from "react"
import { useMap } from "../hooks/useMap"

const data = {
  authenticated: false,
  authUser: {
    name: '',
    username: '',
    email: '',
    institution_name: '',
    phone_no: '',
  }
}

const DataContext = createContext(null)

const DataProvider = ({ children }) => {
  const [appContext, { set: setAppContext }] = useMap(data)

  const providerContext = useMemo(() => ({ appContext, setAppContext }), [appContext])

  return (
    <DataContext.Provider value={providerContext}>
      {children}
    </DataContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(DataContext)
}

export default DataProvider
