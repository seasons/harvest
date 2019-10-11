import React from "react"
import { ErrorPopUp, Theme, Sans, TextInput, Box, Spacer, Button, Flex } from "App/Components"
import { Text } from "Components/Typography"
import { SafeAreaView, TouchableWithoutFeedback } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { color } from "App/utils"
import Auth0 from "react-native-auth0"
import { goHome } from "../../Navigation"

const credentials = {
  domain: "seasons.auth0.com",
  clientId: "ovWzqnt8Qv5lQ4dhzpxdFb2u4zjOg3Cm",
}

const auth0 = new Auth0(credentials)

interface SignInProps {
  onAuth: (credentials, profile) => void
}

export class SignIn extends React.Component<SignInProps> {
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
    if (emailComplete && password.length) {
      this.login(email, password)
    }
  }

  handleResetPassword = () => {
    //FIXME: Handle reset password
  }

  handleApply = () => {
    //FIXME: Handle apply
  }

  onSuccess(credentials) {
    auth0.auth
      .userInfo({ token: credentials.accessToken })
      .then(profile => {
        this.props.onAuth(credentials, profile)
      })
      .catch(error => this.alert("Error", error.json.error_description))
  }

  login(username, password) {
    auth0.auth
      .passwordRealm({
        username: username,
        password: password,
        realm: "Username-Password-Authentication",
      })
      .then(success => {
        AsyncStorage.setItem("userSession", JSON.stringify(success))
        goHome()
      })
      .catch(error => {
        this.alert("Error", error.json.description)
      })
  }

  createUser(username, password) {
    auth0.auth
      .createUser({
        email: username,
        password: password,
        connection: "Username-Password-Authentication",
      })
      .then(success => {
        console.log(success)
        this.alert("Success", "New user created")
      })
      .catch(error => {
        this.alert("Error", error.json.description)
      })
  }

  webAuth(connection) {
    auth0.webAuth
      .authorize({
        scope: "openid profile email",
        connection: connection,
        audience: "https://" + credentials.domain + "/userinfo",
      })
      .then(credentials => {
        this.onSuccess(credentials)
      })
      .catch(error => this.alert("Error", error.error_description))
  }

  alert(title, message) {
    this.setState({ showError: true })
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
