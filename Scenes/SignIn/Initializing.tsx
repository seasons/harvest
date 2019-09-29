import React from "react"
import { View } from "react-native"
import { goToWelcome, goHome } from "../../Navigation"

export class Initializing extends React.Component {
  async componentDidMount() {
    try {
      if (false) {
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
