import { AppContainer } from "App/Navigation"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ApolloProvider } from "@apollo/react-hooks"
import { apolloClient } from "./Apollo"
import { config } from "./utils/config"

export const App = () => {
  const [loaded, setLoaded] = useState(false)
  const loadConfig = async () => {
    await config.start()
    setLoaded(true)
  }
  useEffect(() => {
    loadConfig()
  }, [])
  if (!loaded) {
    return <></>
  }
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
