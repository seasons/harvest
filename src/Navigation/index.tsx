import React, { useState } from "react"
import { NavigationContainer, NavigationContainerRef, getStateFromPath } from "@react-navigation/native"
import { AuthProvider } from "./AuthProvider"
import * as Schema from "./schema"
import { nth } from "lodash"
import { useAuthContext } from "./AuthContext"
export { Schema }

const getActiveRouteName = (state) => {
  const route = state.routes[state.index]

  if (route.state) {
    return getActiveRouteName(route.state)
  }

  return route.name
}

export const AppContainer = ({ apolloClient }) => {
  const { authState } = useAuthContext()
  const routeNameRef = React.useRef(null)
  const navigationRef: React.Ref<NavigationContainerRef> = React.useRef(null)
  const [currentScreen, setCurrentScreen] = useState(Schema.StackNames.HomeStack)

  const linking = {
    prefixes: ["https://www.seasons.nyc", "http://www.seasons.nyc"],
    config: {
      screens: {
        AccountStack: {
          path: "/a/account",
        },

        BrowseStack: {
          path: "browse/*",
          screens: {
            Product: {
              path: "/product/:slug",
              exact: true,
            },
          },
        },

        Modal: {
          screens: {
            CreateAccountModal: "/a/account/create",
            SignInModal: "/a/account/login",
          },
        },

        // Catch-all for unhandled routes
        HomeStack: "*",
      },
    },

    // All routes get evaluated here first
    getStateFromPath: (path: string, options: any) => {
      // analytics
      path = "/a/account/login/"
      // path = "/product/csba-speed-boat-club-printed-long-sleeve-silk-shirt-blue"
      if (path.match(/^\/a\/account\/(login|create)\/*$/g)) {
        // Send the user to the account page if they are already logged in
        console.log("Logged in", authState)
        return getStateFromPath("/a/account", options)
      } else {
        return getStateFromPath(path, options)
      }
    },
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef?.current
        const currentRouteName = getActiveRouteName(state)

        if (previousRouteName !== currentRouteName) {
          setCurrentScreen(currentRouteName)
        }

        routeNameRef.current = currentRouteName
      }}
    >
      <AuthProvider apolloClient={apolloClient} currentScreen={currentScreen} />
    </NavigationContainer>
  )
}
