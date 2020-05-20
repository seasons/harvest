import { getUserSession } from "App/utils/auth"
import React, { useEffect } from "react"
import AuthContext from "./AuthContext"
import AsyncStorage from "@react-native-community/async-storage"
import { createStackNavigator } from "@react-navigation/stack"
import { ModalAndMainScreens } from "./Stacks"
import { NotificationsProvider } from "App/Notifications"
import { PopUp } from "App/Navigation/PopUp"
import { PopUpProvider } from "App/Navigation/PopUp/PopUpProvider"

// For docs on auth see: https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html

const RootStack = createStackNavigator()

export const AuthProvider = ({ currentScreen, navigationRef, apolloClient }) => {
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userSession: action.token,
            isSignedIn: !!action.token,
            authInitializing: false,
          }
        case "SIGN_IN":
          return {
            ...prevState,
            isSignedIn: true,
            userSession: action.token,
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignedIn: false,
            userSession: null,
          }
      }
    },
    {
      authInitializing: true,
      isSignedIn: false,
      userSession: null,
    }
  )

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userSession = await getUserSession()
        if (userSession && userSession.token) {
          dispatch({ type: "RESTORE_TOKEN", token: userSession.token })
        }
      } catch (e) {
        console.log("Restoring token failed: ", e)
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = {
    signIn: async (session) => {
      dispatch({ type: "SIGN_IN", token: session.token })
      apolloClient.resetStore()
    },
    signOut: async () => {
      await AsyncStorage.removeItem("userSession")
      await AsyncStorage.removeItem("beamsData")
      dispatch({ type: "SIGN_OUT" })
      apolloClient.resetStore()
    },
    authState,
    userSession: authState.userSession,
  }

  return (
    <AuthContext.Provider value={authContext}>
      <PopUpProvider>
        <RootStack.Navigator>
          <RootStack.Screen name="Root" options={{ headerShown: false }}>
            {() => (
              <NotificationsProvider>
                <ModalAndMainScreens currentScreen={currentScreen} />
              </NotificationsProvider>
            )}
          </RootStack.Screen>
        </RootStack.Navigator>
        <PopUp />
      </PopUpProvider>
    </AuthContext.Provider>
  )
}
