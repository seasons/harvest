import { AppContainer } from "App/Navigation"
import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ApolloProvider } from "@apollo/react-hooks"

import { setupApolloClient } from "./Apollo"
import { config } from "./utils/config"

export const App = () => {
  const [apolloClient, setApolloClient] = useState(null)
  useEffect(() => {
    async function loadClient() {
      await config.start()
      const client = await setupApolloClient()
      setApolloClient(client)
    }
    loadClient()
  }, [])

  if (!apolloClient) {
    return null
  }

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
