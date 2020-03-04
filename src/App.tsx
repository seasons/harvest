import { AppContainer } from "App/Navigation"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ApolloProvider } from "@apollo/react-hooks"
import { apolloClient } from "./Apollo"
import { checkNotifications } from "react-native-permissions"
import { notificationsInit } from "./setupNotifications"
import AsyncStorage from "@react-native-community/async-storage"
import { useNavigation } from "@react-navigation/native"

export const App = () => {
  const navigation = useNavigation()

  checkNotifications()
    .then(async ({ status }) => {
      if (status === "granted") {
        const beamsData = await AsyncStorage.getItem("beamsData")
        if (beamsData) {
          const { beamsToken, email } = JSON.parse(beamsData)
          notificationsInit(email, beamsToken, navigation)
        }
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
