import { Box, Button, Flex, PopUp, Sans, Spacer, TextInput, Theme, FixedBackArrow } from "App/Components"
import { isValidEmail } from "App/helpers/regex"
import { color } from "App/Utils"
import { Text } from "Components/Typography"
import gql from "graphql-tag"
import React, { useState, useRef } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import AsyncStorage from "@react-native-community/async-storage"
import { useSafeArea } from "react-native-safe-area-context"
import { checkNotifications } from "react-native-permissions"

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
  const [isMutating, setIsMutating] = useState(false)
  const [emailComplete, setEmailComplete] = useState(false)
  const [showError, setShowError] = useState(false)
  const [login] = useMutation(LOG_IN, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: err => {
      console.log("err", err)
      setShowError(true)
      setIsMutating(false)
    },
  })

  const onEmailChange = val => {
    setEmail(val)
    setEmailComplete(isValidEmail(val))
  }

  const checkPermissions = () => {
    checkNotifications()
      .then(({ status, settings }) => {
        console.log("status", status)
        console.log("settings", settings)
        props.navigation.navigate("AllowNotifications")
      })
      .catch(error => {
        console.log("error checking for permission", error)
        props.navigation.navigate("Home")
      })
  }

  const handleLogin = async () => {
    if (!isMutating) {
      Keyboard.dismiss()
      setIsMutating(true)
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
        checkPermissions()
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
    <SafeAreaView style={{ flex: 1 }}>
      <Theme>
        <FixedBackArrow navigation={props.navigation} variant="whiteBackground" />
        <Flex style={{ flex: 1 }}>
          <Spacer mb={3} />
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
              <Button loading={isMutating} block onPress={handleLogin} disabled={disabled} variant="primaryBlack">
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
                  Sign in using the same email and password you used for the wailist.
                </Sans>
              </Text>
            </Box>
          </Flex>
          <PopUp data={popUpData} show={showError} />
        </Flex>
      </Theme>
    </SafeAreaView>
  )
}
