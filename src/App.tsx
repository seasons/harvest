import { ApolloProvider } from "@apollo/react-hooks"
import { AppContainer } from "App/Navigation"
import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { setupApolloClient } from "./Apollo"
import { NetworkProvider } from "./NetworkProvider"
import { config } from "./utils/config"
import { enableScreens } from "react-native-screens"

enableScreens()

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
        <NetworkProvider>
          <AppContainer apolloClient={apolloClient} />
        </NetworkProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
