import { createContext, useContext, useMemo, useState } from "react"

const authUser = {
  email: '',
}

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(authUser)

  const providerContext = useMemo(() => ({ authContext, setAuthContext }), [authContext])

  return (
    <AuthContext.Provider value={providerContext}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export default AuthProvider
