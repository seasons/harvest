import React from "react"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"
import { checkNotifications } from "react-native-permissions"
import { notificationsInit } from "App/setupNotifications"

export const Notifications = ({ children }) => {
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

  return <>{children}</>
}
