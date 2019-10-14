import React from "react"
import { View } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class Initializing extends React.Component<Props> {
  async componentDidMount() {
    const { navigation } = this.props
    try {
      let userSession = await AsyncStorage.getItem("userSession")
      userSession = JSON.parse(userSession)

      if (userSession && userSession.accessToken) {
        navigation.navigate("MainNavigator")
      } else {
        navigation.navigate("AuthStack")
      }
    } catch (err) {
      console.log("error: ", err)
      navigation.navigate("AuthStack")
    }
  }

  render() {
    return <View />
  }
}
