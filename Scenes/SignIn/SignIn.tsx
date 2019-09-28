import React from "react"
import Auth0 from "react-native-auth0"
import { Theme, Sans, TextInput, Box, Spacer, Button, Flex } from "../../components"
import { Text } from "../../components/Typography"
import { SafeAreaView, TouchableWithoutFeedback, AsyncStorage } from "react-native"
import { color } from "../../helpers"

const auth0 = new Auth0({ domain: "seasons.auth0.com", clientId: "zSCYlUB8NNZi9vlxjAQQr2u3Y58jDZKV" })

export class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    emailComplete: false,
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
    console.log("handling it", auth0.webAuth)
    if (emailComplete && password.length) {
      // auth0.webAuth
      //   .login({
      //     realm: "tests",
      //     email,
      //     password,
      //   })
      //   .then(
      //     credentials => console.log(credentials)
      //     // Successfully authenticated
      //     // Store the accessToken
      //   )
      //   .catch(error => console.log(error))
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

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color("black") }}>
        <Theme>
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
                onPress={this.handleSignIn}
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
        </Theme>
      </SafeAreaView>
    )
  }
}
