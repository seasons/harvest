import { AppContainer } from "App/Navigation"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ApolloProvider } from "@apollo/react-hooks"

import { apolloClient } from "./Apollo"
import { init } from "./setupNotifications"

init()

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
