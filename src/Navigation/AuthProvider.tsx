import { PopUp } from "App/Navigation/PopUp"
import { PopUpProvider } from "App/Navigation/PopUp/PopUpProvider"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import { NotificationsProvider } from "App/Notifications"
import { getUserSession } from "App/utils/auth"
import React, { useEffect, useImperativeHandle } from "react"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"

import AsyncStorage from "@react-native-community/async-storage"
import { createStackNavigator } from "@react-navigation/stack"
import analytics from "@segment/analytics-react-native"

import AuthContext from "./AuthContext"
import { ModalAndMainScreens } from "./Stacks"

// For docs on auth see: https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html

const RootStack = createStackNavigator()

export interface AuthProviderProps {
  currentScreen: any
  apolloClient: any
}

export interface AuthProviderRef {
  authContext: () => {
    signIn: (session: any) => Promise<void>
    signOut: () => Promise<void>
    authState: any
    userSession: any
  }
}

export const AuthProvider = React.forwardRef<AuthProviderRef, AuthProviderProps>(
  ({ currentScreen, apolloClient }, ref) => {
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
            const user = userSession?.user
            if (user) {
              analytics.identify(user.id, user)
            }
            dispatch({ type: "RESTORE_TOKEN", token: userSession.token })
          }
        } catch (e) {
          console.log("Restoring token failed: ", e)
        }
      }

      bootstrapAsync()
    }, [])

    // Forward authContext to any parents holding a ref to this AuthProvider.
    useImperativeHandle(ref, () => ({
      authContext: () => authContext,
    }))

    const authContext = {
      signIn: async (session) => {
        dispatch({ type: "SIGN_IN", token: session.token })
        const user = session?.user
        if (user) {
          analytics.identify(user.id, user)
        }
        apolloClient.resetStore()
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userSession")
        await AsyncStorage.removeItem("beamsData")
        RNPusherPushNotifications.clearAllState()
        analytics.reset()
        dispatch({ type: "SIGN_OUT" })
        apolloClient.resetStore()
      },
      authState,
      userSession: authState.userSession,
    }

    return (
      <AuthContext.Provider value={authContext}>
        <ActionSheetProvider>
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
        </ActionSheetProvider>
      </AuthContext.Provider>
    )
  }
)
