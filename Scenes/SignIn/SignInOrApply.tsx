import React from "react"
import { Theme, Button, Sans, Spacer, Box } from "../../components"
import { SafeAreaView } from "react-native"
import { color } from "../../helpers"

export class SignInOrApply extends React.Component {
  handleSignIn = () => {
    // FIXME: handle sign in
  }
  handleApply = () => {
    // FIXME: handle apply
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color("black") }}>
        <Theme>
          <Box p={2}>
            <Sans color="white" size="3">
              Welcome
            </Sans>
            <Spacer mb={1} />
            <Sans color="gray" size="2">
              Sign in to access the most coveted menswear and streetware brands.
            </Sans>
            <Spacer mb={2} />
            <Button onPress={() => this.handleSignIn()} variant="primaryLight">
              Sign in
            </Button>
            <Spacer mb={1} />
            <Button onPress={() => this.handleApply()} variant="secondaryLight">
              Apply
            </Button>
          </Box>
        </Theme>
      </SafeAreaView>
    )
  }
}
