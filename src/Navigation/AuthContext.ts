import { GetBagAndSavedItems_me } from "App/generated/GetBagAndSavedItems"
import React, { useContext } from "react"

export const useAuthContext = () => useContext(AuthContext)

const AuthContext = React.createContext({
  signIn: (session: string) => null,
  signOut: () => null,
  resetStore: () => null,
  updateMe: (me: GetBagAndSavedItems_me) => null,
  userSession: null,
  me: null,
  authState: { authInitializing: true, isSignedIn: false, userSession: null },
})

export default AuthContext
