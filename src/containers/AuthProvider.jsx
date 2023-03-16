import { createContext, useContext, useMemo } from "react"
import { useMap } from "../hooks/useMap"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [notification, { set: setNotification, setAll: setAllNotification }] = useMap({
    show: false,
    title: '',
    description: '',
    status: 'success',
  })

  const authContext = useMemo(() => ({ notification, setNotification, setAllNotification }), [notification])

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export default AuthProvider
