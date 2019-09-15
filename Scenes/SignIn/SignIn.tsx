import React from "react"
import { Theme, Sans, TextInput, Box, Spacer, Button } from "../../components"
import { Text } from "../../components/Typography"
import { SafeAreaView, TouchableWithoutFeedback } from "react-native"
import { color } from "../../helpers"

export class SignIn extends React.Component {
  handleResetPassword = () => {
    //FIXME: Handle reset password
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color("black") }}>
        <Theme>
          <Box p={2} mt={6}>
            <Sans color="white" size="3">
              Welcome
            </Sans>
            <Spacer mb={2} />
            <TextInput placeholder="Email" variant="dark" />
            <Spacer mb={2} />
            <TextInput secureTextEntry placeholder="Password" variant="dark" />
            <Spacer mb={2} />
            <Text>
              <Sans size="2" color="gray">
                Forget password?
              </Sans>{" "}
              <TouchableWithoutFeedback onPress={this.handleResetPassword}>
                <Sans style={{ textDecorationLine: "underline" }} size="2" color="white">
                  Reset
                </Sans>
              </TouchableWithoutFeedback>
            </Text>
            <Spacer mb={4} />
            <Button variant="primaryLight">Sign in</Button>
          </Box>
        </Theme>
      </SafeAreaView>
    )
  }
}
