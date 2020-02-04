import { AppContainer } from "App/Navigation"
import React, { useEffect } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ApolloProvider } from "@apollo/react-hooks"
import { apolloClient } from "./Apollo"
import analytics from "@segment/analytics-react-native"

export const App = () => {
  useEffect(() => {
    const setupAnalytics = async () => {
      await analytics.setup("6cdqrLXsben2gavsJ6oVIO9lWVKudY9m", {
        // Record screen views automatically!
        recordScreenViews: true,
        // Record certain application events automatically!
        trackAppLifecycleEvents: true,
      })
    }
    setupAnalytics()
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
