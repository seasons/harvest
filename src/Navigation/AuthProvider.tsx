import { GetBagAndSavedItems_me } from "App/generated/GetBagAndSavedItems"
import { BottomSheetProvider } from "App/Navigation/BottomSheetContext"
import { ErrorPopUp } from "App/Navigation/ErrorPopUp"
import { PopUpProvider } from "App/Navigation/ErrorPopUp/PopUpProvider"
import { NotificationsProvider } from "App/Notifications"
import { GET_LOCAL_BAG } from "App/queries/clientQueries"
import { GET_BAG } from "App/Scenes/Bag/BagQueries"
import { getUserSession, userSessionToIdentifyPayload } from "App/utils/auth"
import React, { useEffect, useImperativeHandle } from "react"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"

import { useLazyQuery } from "@apollo/client"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
import AsyncStorage from "@react-native-community/async-storage"
import { createStackNavigator } from "@react-navigation/stack"
import { NotificationBarProvider } from "@seasons/eclipse"
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
    updateMe: (me: GetBagAndSavedItems_me) => Promise<void>
    resetStore: () => void
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
              me: null,
            }
          case "UPDATE_ME":
            return {
              ...prevState,
              me: action.me,
            }
        }
      },
      {
        authInitializing: true,
        isSignedIn: false,
        userSession: null,
      }
    )

    const [getBag] = useLazyQuery(GET_BAG, {
      onCompleted: (data) => {
        if (data?.me?.id) {
          dispatch({ type: "RESTORE_TOKEN", token: data.me })
        }
      },
    })

    useEffect(() => {
      const bootstrapAsync = async () => {
        try {
          const userSession = await getUserSession()
          if (userSession && userSession.token) {
            const user = userSession?.user
            if (user) {
              analytics.identify(user.id, userSessionToIdentifyPayload(userSession))
            }
            dispatch({ type: "RESTORE_TOKEN", token: userSession.token })
          }
        } catch (e) {
          console.log("Restoring token failed: ", e)
        }
      }

      bootstrapAsync()
      getBag()
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
          analytics.identify(user.id, userSessionToIdentifyPayload(session))
        }
        apolloClient.resetStore()
      },
      signOut: async () => {
        await AsyncStorage.removeItem("userSession")
        await AsyncStorage.removeItem("beamsData")
        RNPusherPushNotifications.clearAllState()
        apolloClient.resetStore()
        analytics.reset()
        dispatch({ type: "SIGN_OUT" })
        setTimeout(() => {
          apolloClient.writeQuery({
            query: GET_LOCAL_BAG,
            data: {
              localBagItems: [],
            },
          })
        }, 2000)
      },
      resetStore: () => {
        apolloClient.resetStore()
      },
      authState,
      updateMe: (me: GetBagAndSavedItems_me) => {
        dispatch({ type: "UPDATE_ME", me })
      },
      userSession: authState.userSession,
      me: authState.me,
    }

    return (
      <AuthContext.Provider value={authContext}>
        <BottomSheetProvider>
          <ActionSheetProvider>
            <NotificationBarProvider>
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
                <ErrorPopUp />
              </PopUpProvider>
            </NotificationBarProvider>
          </ActionSheetProvider>
        </BottomSheetProvider>
      </AuthContext.Provider>
    )
  }
)
