import React from "react"
import { Theme, Sans } from "../../components"
import { SafeAreaView } from "react-native"
import { color } from "../../helpers"

export class SignIn extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color("black") }}>
        <Theme>
          <Sans color="white" size="3">
            Sign in view
          </Sans>
        </Theme>
      </SafeAreaView>
    )
  }
}
