import React from "react"
import SplashScreen from "react-native-splash-screen"
import { getUserSession } from "App/Utils/auth"
import { TabsStack, ModalStackScreen } from "./Stacks"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { color } from "App/Utils"
import AsyncStorage from "@react-native-community/async-storage"

// For docs on auth see: https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html

const RootStack = createStackNavigator()
export const AuthContext = React.createContext(null)

const defaultOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: color("white100"),
    opacity: 1,
  },
}

export const AuthProvider = ({ currentScreen, navigationRef }) => {
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userSession: action.token,
            authInitializing: false,
          }
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userSession: action.token,
          }
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userSession: null,
          }
      }
    },
    {
      authInitializing: true,
      isSignout: false,
      userSession: null,
    }
  )

  React.useEffect(() => {
    // const navigation = navigationRef.current
    const bootstrapAsync = async () => {
      try {
        const userSession = await getUserSession()
        console.log("userSession", userSession)
        if (userSession && userSession.token) {
          dispatch({ type: "RESTORE_TOKEN", token: userSession.token })
        }
      } catch (e) {
        console.log("Restoring token failed: ", e)
      }
    }

    bootstrapAsync()
  }, [])

  console.log("authState", authState)

  //   if (!authState.authInitializing) {
  SplashScreen.hide()
  //   }

  const authContext = {
    signIn: async ({ session }) => {
      console.log("session in auth", session)
      dispatch({ type: "SIGN_IN", token: session })
    },
    signOut: async () => {
      await AsyncStorage.removeItem("userSession")
      dispatch({ type: "SIGN_OUT" })
    },
    authState,
    userSession: authState.userSession,
  }

  return (
    <AuthContext.Provider value={authContext}>
      <RootStack.Navigator
        mode="modal"
        initialRouteName="Main"
        screenOptions={{
          ...defaultOptions,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <RootStack.Screen name="Main" options={{ headerShown: false }}>
          {() => <TabsStack currentScreen={currentScreen} />}
        </RootStack.Screen>
        <RootStack.Screen name="Modal" component={ModalStackScreen} />
      </RootStack.Navigator>
    </AuthContext.Provider>
  )
}
