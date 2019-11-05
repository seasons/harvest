import React, { useState } from "react"
import { ErrorPopUp, Theme, Sans, TextInput, Box, Spacer, Button, Flex } from "App/Components"
import { Text } from "Components/Typography"
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from "react-native"
import { useMutation } from "react-apollo"
import AsyncStorage from "@react-native-community/async-storage"
import { color } from "App/Utils"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import gql from "graphql-tag"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        firstName
        lastName
      }
      token
    }
  }
`

interface LogInProps {
  onAuth: (credentials, profile) => void
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export const LogIn: React.FC<LogInProps> = props => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailComplete, setEmailComplete] = useState(false)
  const [showError, setShowError] = useState(false)
  const [login] = useMutation(LOG_IN, {
    onError: error => {
      console.log(error)

      Keyboard.dismiss()
      // TODO: handle different types of errors
      setShowError(true)
    },
  })

  const onEmailChange = val => {
    const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmail(val)
    setEmailComplete(emailValidationRegex.test(val))
  }

  const handleLogin = async () => {
    if (emailComplete && password.length) {
      try {
        const result = await login({
          variables: {
            email,
            password,
          },
        })
        console.log(result)

        const {
          data: { login: userSession },
        } = result
        AsyncStorage.setItem("userSession", JSON.stringify(userSession))
        props.navigation.navigate("Home")
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleApply = () => {
    // TODO: link to webview
  }

  const handleResetPassword = () => {
    // TODO: implement
  }

  const disabled = !(emailComplete && password.length)

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
              onChangeText={(_, val) => onEmailChange(val)}
            />
            <Spacer mb={2} />
            <TextInput
              secureTextEntry
              placeholder="Password"
              variant="dark"
              inputKey="password"
              textContentType="Password"
              onChangeText={(_, val) => setPassword(val)}
            />
            <Spacer mb={2} />
            <Text>
              <Sans size="2" color="gray">
                Forget password?
              </Sans>{" "}
              <TouchableWithoutFeedback onPress={handleResetPassword}>
                <Sans style={{ textDecorationLine: "underline" }} size="2" color="white">
                  Reset
                </Sans>
              </TouchableWithoutFeedback>
            </Text>
            <Spacer mb={4} />
            <Button onPress={handleLogin} disabled={disabled} variant="primaryLight">
              Sign in
            </Button>
          </Box>
          <Box p={2}>
            <Text style={{ textAlign: "center" }}>
              <Sans size="2" color="gray">
                Not a member?
              </Sans>{" "}
              <TouchableWithoutFeedback onPress={handleApply}>
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
          show={showError}
          onClose={() => setShowError(false)}
        />
      </Theme>
    </SafeAreaView>
  )
}
