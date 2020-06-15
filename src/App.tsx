import { ApolloProvider } from "@apollo/react-hooks"
import { AppContainer } from "App/Navigation"
import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { setupApolloClient } from "./Apollo"
import { NetworkProvider } from "./NetworkProvider"
import { config, Env } from "./utils/config"
import { enableScreens } from "react-native-screens"
import * as Sentry from "@sentry/react-native"
import DeviceInfo from "react-native-device-info"
import AsyncStorage from "@react-native-community/async-storage"
import { Platform } from "react-native"

enableScreens()

export const App = () => {
  const [apolloClient, setApolloClient] = useState(null)
  useEffect(() => {
    async function loadClient() {
      await config.start()
      const client = await setupApolloClient()
      setApolloClient(client)

      Sentry.init({
        dsn: config.get(Env.SENTRY_DSN),
      })
    }
    loadClient()
  }, [])

  const checkApolloBuildCache = async () => {
    const buildNumber = DeviceInfo.getBuildNumber()
    const storedBuildNumber = await AsyncStorage.getItem("iosBuildNumber")
    if (!!buildNumber && Platform?.OS === "ios" && storedBuildNumber !== buildNumber) {
      await AsyncStorage.setItem("iosBuildNumber", buildNumber)
      apolloClient.resetStore()
    }
  }

  if (!apolloClient) {
    return null
  } else {
    checkApolloBuildCache()
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
