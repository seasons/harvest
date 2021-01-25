import { AppContainer } from "App/Navigation"
import React, { useEffect, useState } from "react"
import { Platform } from "react-native"
import DeviceInfo from "react-native-device-info"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import stripe from "tipsi-stripe"
import { ApolloProvider, gql } from "@apollo/client"
import AsyncStorage from "@react-native-community/async-storage"
import * as Sentry from "@sentry/react-native"
import { setupApolloClient } from "./Apollo"
import { NetworkProvider } from "./NetworkProvider"
import { config, Env } from "./utils/config"

enableScreens()

export const App = () => {
  const [apolloClient, setApolloClient] = useState(null)
  useEffect(() => {
    async function loadClient() {
      await config.start()
      const client = await setupApolloClient()

      client.writeQuery({
        query: gql`
          query InitializeLocalCache {
            localBagItems {
              productID
              variantID
            }
          }
        `,
        data: {
          localBagItems: [],
        },
      })

      setApolloClient(client)

      if (!__DEV__) {
        Sentry.init({
          dsn: config.get(Env.SENTRY_DSN),
        })
      }
    }
    loadClient()

    stripe.setOptions({
      publishableKey: config.get(Env.STRIPE_KEY),
      merchantId: config.get(Env.APPLE_MERCHANT_ID),
    })
  }, [])

  const checkApolloBuildCache = async () => {
    // This will check if the build has updated and resets the apollo cache if it has
    const buildNumber = DeviceInfo.getBuildNumber()
    const storedBuildNumber = await AsyncStorage.getItem("iosBuildNumber")
    if (!!storedBuildNumber && !!buildNumber && Platform?.OS === "ios" && storedBuildNumber !== buildNumber) {
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
