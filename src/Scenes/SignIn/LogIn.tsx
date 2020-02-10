import { Box, Button, Flex, PopUp, Sans, Spacer, TextInput, Theme, CloseButton } from "App/Components"
import { isValidEmail } from "App/helpers/regex"
import { color } from "App/Utils"
import { Text } from "Components/Typography"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import AsyncStorage from "@react-native-community/async-storage"
import { useSafeArea } from "react-native-safe-area-context"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        firstName
        lastName
      }
      token
      refreshToken
      expiresIn
    }
  }
`

interface LogInProps {
  onAuth: (credentials, profile) => void
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export const LogIn: React.FC<LogInProps> = props => {
  const insets = useSafeArea()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailComplete, setEmailComplete] = useState(false)
  const [showError, setShowError] = useState(false)
  const [login] = useMutation(LOG_IN, {
    onError: err => {
      setShowError(true)
      Keyboard.dismiss()
    },
  })

  const onEmailChange = val => {
    setEmail(val)
    setEmailComplete(isValidEmail(val))
  }

  const handleLogin = async () => {
    if (emailComplete && password.length) {
      const result = await login({
        variables: {
          email,
          password,
        },
      })
      if (result?.data) {
        const {
          data: { login: userSession },
        } = result
        AsyncStorage.setItem("userSession", JSON.stringify(userSession))
        props.navigation.navigate("Home")
      }
    }
  }

  const handleResetPassword = () => {
    props.navigation.navigate("ResetPasswordModal")
  }

  const disabled = !(emailComplete && password.length)

  const popUpData = {
    title: "Oops! Try again!",
    note: "Your email or password may be incorrect. Not a member? Apply for the waitlist.",
    buttonText: "Close",
    onClose: () => setShowError(false),
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color("white100") }}>
      <Theme>
        <>
          <Spacer mb={3} />
          <CloseButton navigation={props.navigation} variant="light" />
          <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
            <Box p={2} mt={6}>
              <Sans color={color("black100")} size="3">
                Welcome
              </Sans>
              <Spacer mb={3} />
              <TextInput
                placeholder="Email"
                variant="light"
                textContentType="Email"
                inputKey="email"
                onChangeText={(_, val) => onEmailChange(val)}
              />
              <Spacer mb={2} />
              <TextInput
                secureTextEntry
                placeholder="Password"
                variant="light"
                inputKey="password"
                textContentType="Password"
                onChangeText={(_, val) => setPassword(val)}
              />
              <Spacer mb={4} />
              <Button block onPress={handleLogin} disabled={disabled} variant="primaryWhite">
                Sign in
              </Button>
              <Spacer mb={3} />
              <Flex flexDirection="row" justifyContent="center">
                <Text>
                  <Sans size="2" color="gray">
                    Forget password?
                  </Sans>{" "}
                  <TouchableWithoutFeedback onPress={handleResetPassword}>
                    <Sans style={{ textDecorationLine: "underline" }} size="2" color={color("black50")}>
                      Reset
                    </Sans>
                  </TouchableWithoutFeedback>
                </Text>
              </Flex>
            </Box>
            <Box p={4} pb={6}>
              <Text style={{ textAlign: "center" }}>
                <Sans size="2" color="gray">
                  Sign in using the same emial and password you used for the wailist.
                </Sans>
              </Text>
            </Box>
          </Flex>
          <PopUp data={popUpData} show={showError} />
        </>
      </Theme>
    </SafeAreaView>
  )
}
