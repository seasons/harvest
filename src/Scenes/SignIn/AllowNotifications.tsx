import React from "react"
import { Theme, Sans } from "App/Components"
import { SafeAreaView } from "react-native"
import { color } from "App/Utils"

export class AllowNotifications extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color("black") }}>
        <Theme>
          <Sans color="white" size="3">
            Allow notification view
          </Sans>
        </Theme>
      </SafeAreaView>
    )
  }
}
