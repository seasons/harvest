import React from "react"
import { View } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { goToWelcome, goHome } from "../../Navigation"

export class Initializing extends React.Component {
  async componentDidMount() {
    try {
      let userSession = await AsyncStorage.getItem("userSession")
      userSession = JSON.parse(userSession)

      if (userSession && userSession.accessToken) {
        goHome()
      } else {
        goToWelcome()
      }
    } catch (err) {
      console.log("error: ", err)
      goToWelcome()
    }
  }

  render() {
    return <View />
  }
}
