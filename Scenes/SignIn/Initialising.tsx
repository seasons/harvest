import React from "react"
import { View } from "react-native"
import { goToAuth, goHome } from "../../Navigation"

export class Initialising extends React.Component {
  async componentDidMount() {
    try {
      if (false) {
        goHome()
      } else {
        goToAuth()
      }
    } catch (err) {
      console.log("error: ", err)
      goToAuth()
    }
  }

  render() {
    return <View />
  }
}
