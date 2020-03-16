import { AppContainer } from "App/Navigation"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ApolloProvider } from "@apollo/react-hooks"
import { apolloClient } from "./Apollo"
import { config } from "./utils/config"

export const App = () => {
  config.start()
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
