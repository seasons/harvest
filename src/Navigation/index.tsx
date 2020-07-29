import React, { useState } from "react"
import { NavigationContainer, NavigationContainerRef, getStateFromPath } from "@react-navigation/native"
import { AuthProvider, AuthProviderRef } from "./AuthProvider"
import * as Schema from "./schema"
export { Schema }

const getActiveRouteName = (state) => {
  const route = state.routes[state.index]

  if (route.state) {
    return getActiveRouteName(route.state)
  }

  return route.name
}

export const AppContainer = ({ apolloClient }) => {
  const routeNameRef = React.useRef(null)
  const authProviderRef: React.Ref<AuthProviderRef> = React.useRef(null)
  const navigationRef: React.Ref<NavigationContainerRef> = React.useRef(null)
  const [currentScreen, setCurrentScreen] = useState(Schema.StackNames.HomeStack)

  const isSignedIn: () => boolean = () => authProviderRef?.current?.authContext().authState?.isSignedIn ?? false

  const linking = {
    prefixes: ["https://www.seasons.nyc", "http://www.seasons.nyc"],
    config: {
      screens: {
        BrowseStack: {
          path: "/browse",
          initialRouteName: "Browse",
          screens: {
            Browse: "/*",
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

        AccountStack: {
          path: "/a/account",
          initialRouteName: "Account",
          screens: {
            Account: "/*",
          },
        },

        // Catch-all for unhandled routes
        HomeStack: "*",
      },
    },

    // All routes get evaluated here first
    getStateFromPath: (path: string, options: any) => {
      // analytics
      if (path.match(/^\/a\/account\/(login|create)\/*$/g) && isSignedIn()) {
        // Send the user to the account page if they are already logged in
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
      <AuthProvider apolloClient={apolloClient} currentScreen={currentScreen} ref={authProviderRef} />
    </NavigationContainer>
  )
}
