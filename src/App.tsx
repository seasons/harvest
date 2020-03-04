import { AppContainer } from "App/Navigation"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ApolloProvider } from "@apollo/react-hooks"
import { apolloClient } from "./Apollo"
import { checkNotifications } from "react-native-permissions"
import { notificationsInit } from "./setupNotifications"

export const App = () => {
  checkNotifications()
    .then(({ status }) => {
      if (status === "granted") {
        notificationsInit()
      }
    })
    .catch(error => {
      console.log("error checking for permission", error)
    })

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}
