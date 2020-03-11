import React, { useContext } from "react"

export const useAuthContext = () => useContext(AuthContext)

const AuthContext = React.createContext({
  signIn: (session: string) => null,
  signOut: () => null,
  userSession: null,
  authState: { authInitializing: true, isSignedIn: false, userSession: null },
})

export default AuthContext
