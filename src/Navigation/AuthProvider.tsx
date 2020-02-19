import React from "react"
import SplashScreen from "react-native-splash-screen"
import { getUserSession } from "App/Utils/auth"
import { TabsStack, ModalStackScreen } from "./Stacks"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { color } from "App/Utils"

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
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userSession: action.token,
            isLoading: false,
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
      isLoading: true,
      isSignout: false,
      userSession: null,
    }
  )

  React.useEffect(() => {
    const navigation = navigationRef.current
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userSession

      try {
        userSession = getUserSession()

        if (userSession && userSession.token) {
          //   navigation.navigate("Main", { screen: "Home" })
        } else {
          //   navigation.navigate("Auth")
          //   navigation.navigate("Main", { screen: "Home" })
        }
      } catch (e) {
        // navigation.navigate("Main", { screen: "Home" })
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userSession })
    }

    bootstrapAsync()
  }, [])

  if (!state.isLoading) {
    SplashScreen.hide()
  }

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log("data", data)
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" })
      },
    }),
    []
  )

  return (
    <AuthContext.Provider value={authContext}>
      <RootStack.Navigator
        mode="modal"
        initialRouteName="Main"
        screenOptions={{
          ...defaultOptions,
          gestureEnabled: true,
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
