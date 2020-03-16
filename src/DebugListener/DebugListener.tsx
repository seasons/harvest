import React from "react"
import RNShake from "react-native-shake"

export class DebugListener extends React.Component {
  UNSAFE_componentWillMount() {
    console.log("attach", RNShake.addEventListener)
    console.log("props", this.props)
    RNShake.addEventListener("ShakeEvent", () => {
      console.log("shaked")
      // this.props.navigation.navigate("Modal", {
      //   screen: "DebugMenu",
      // })
    })
  }

  UNSAFE_componentWillUnmount() {
    RNShake.removeEventListener("ShakeEvent")
  }

  render() {
    return <>{this.props.children}</>
  }
}
