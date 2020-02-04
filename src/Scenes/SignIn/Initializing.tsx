import { getUserSession } from "App/Utils/auth"
import React from "react"
import SplashScreen from "react-native-splash-screen"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class Initializing extends React.Component<Props> {
  async componentDidMount() {
    SplashScreen.hide()
  }

  async navigateTo() {
    const { navigation } = this.props
    try {
      let userSession = await getUserSession()

      if (userSession && userSession.token) {
        navigation.navigate("Home")
      } else {
        navigation.navigate("Auth")
      }
    } catch (err) {
      console.log("error: ", err)
      navigation.navigate("Auth")
    }
  }

  render() {
    this.navigateTo()
    return null
  }
}
