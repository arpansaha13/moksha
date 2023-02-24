import { createContext, useContext, useState } from "react"

const authUser = {
  email: '',
}

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(authUser);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export default AuthProvider
