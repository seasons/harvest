import React from "react"
import { ErrorPopUp, Theme, Sans, TextInput, Box, Spacer, Button, Flex } from "../../components"
import { Text } from "../../components/Typography"
import { SafeAreaView, TouchableWithoutFeedback } from "react-native"
import { color } from "../../helpers"

export class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    emailComplete: false,
    showError: false,
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
    if (key === "email") {
      const emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      this.setState({ emailComplete: emailValidationRegex.test(val) })
    }
  }

  handleSignIn = () => {
    const { email, password, emailComplete } = this.state
    this.setState({ showError: true })
    if (emailComplete && password.length) {
      // Add mutation to sign in
    }
  }

  handleResetPassword = () => {
    //FIXME: Handle reset password
  }

  handleApply = () => {
    //FIXME: Handle apply
  }

  render() {
    const { emailComplete, password } = this.state

    const disabled = !(emailComplete && password.length)

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color("black") }}>
        <Theme>
          <>
            <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
              <Box p={2} mt={6}>
                <Sans color="white" size="3">
                  Welcome
                </Sans>
                <Spacer mb={2} />
                <TextInput
                  placeholder="Email"
                  variant="dark"
                  textContentType="Email"
                  inputKey="email"
                  onChangeText={this.onChangeText}
                />
                <Spacer mb={2} />
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  variant="dark"
                  inputKey="password"
                  textContentType="Password"
                  onChangeText={this.onChangeText}
                />
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
                <Button
                  onPress={() => this.handleSignIn()}
                  variant={emailComplete && password.length ? "primaryLight" : "secondaryLight"}
                >
                  Sign in
                </Button>
              </Box>
              <Box p={2}>
                <Text style={{ textAlign: "center" }}>
                  <Sans size="2" color="gray">
                    Not a member?
                  </Sans>{" "}
                  <TouchableWithoutFeedback onPress={this.handleApply}>
                    <Sans style={{ textDecorationLine: "underline" }} size="2" color="white">
                      Apply
                    </Sans>
                  </TouchableWithoutFeedback>
                </Text>
              </Box>
            </Flex>
            <ErrorPopUp
              buttonText="Got it"
              note="Your email or password may be incorrect. Not a member? Apply for the waitlist."
              title="Oops! Try again"
              show={this.state.showError}
              onClose={() => this.setState({ showError: false })}
            />
          </>
        </Theme>
      </SafeAreaView>
    )
  }
}
