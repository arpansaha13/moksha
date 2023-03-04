import { createContext, useContext, useMemo, useState } from "react"

const data = {
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
  const [appContext, setAppContext] = useState(data)

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
