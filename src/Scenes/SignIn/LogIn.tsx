import { Box, Button, CloseButton, Container, Flex, Sans, Spacer, TextInput } from "App/Components"
import { isValidEmail } from "App/helpers/regex"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { useNotificationsContext } from "App/Notifications/NotificationsContext"
import { color } from "App/utils"
import { Text } from "Components/Typography"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { checkNotifications } from "react-native-permissions"

import AsyncStorage from "@react-native-community/async-storage"

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      customer {
        id
        status
        admissions {
          id
          admissable
        }
        bagItems {
          id
        }
        detail {
          id
          shippingAddress {
            id
            state
          }
        }
      }
      user {
        createdAt
        id
        email
        firstName
        lastName
        beamsToken
        roles
      }
      token
      refreshToken
      expiresIn
    }
  }
`

interface LogInProps {
  onAuth: (credentials, profile) => void
  navigation: any
}

export const LogIn: React.FC<LogInProps> = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isMutating, setIsMutating] = useState(false)
  const [emailComplete, setEmailComplete] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { signIn } = useAuthContext()
  const { init } = useNotificationsContext()

  const [login] = useMutation(LOG_IN, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops! Try again!",
        note: "Your email or password may be incorrect. Not a member? Apply for the waitlist.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const onEmailChange = (val) => {
    setEmail(val)
    setEmailComplete(isValidEmail(val))
  }

  const checkPermissions = () => {
    checkNotifications()
      .then(({ status }) => {
        if (status === "denied") {
          props.navigation.popToTop()
          props.navigation.navigate("Modal", { screen: "AllowNotificationsModal" })
        } else {
          // if, e.g, another used signed in on this device first and this user is inherting their "granted"
          // status, ensure we properly set up their push notifications infrastructure
          if (status === "granted") {
            init()
          }

          props.navigation.navigate("Main")
        }
      })
      .catch((error) => {
        console.log("error checking for permission", error)
        props.navigation.navigate("Main")
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
        console.log(userSession)
        signIn(userSession)
        const beamsToken = userSession?.user?.beamsToken
        const roles = userSession?.user?.roles
        const beamsData = { beamsToken, email, roles }
        AsyncStorage.setItem("beamsData", JSON.stringify(beamsData))
        AsyncStorage.setItem("userSession", JSON.stringify(userSession))
        checkPermissions()
      }
    }
  }

  const handleResetPassword = () => {
    props.navigation.navigate("ResetPasswordModal", { screen: "FiltersModal" })
  }

  const disabled = !(emailComplete && password.length)

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <CloseButton variant="light" />
      <Flex style={{ flex: 1 }}>
        <Spacer mb={3} />
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <Box p={2} mt={5}>
            <Sans color={color("black100")} size="3">
              Welcome
            </Sans>
            <Spacer mb={3} />
            <TextInput
              headerText="Email"
              variant="light"
              inputKey="email"
              onChangeText={(_, val) => onEmailChange(val)}
            />
            <Spacer mb={2} />
            <TextInput
              secureTextEntry
              headerText="Password"
              variant="light"
              inputKey="password"
              onChangeText={(_, val) => setPassword(val)}
            />
            <Spacer mb={4} />
            <Button loading={isMutating} block onPress={handleLogin} disabled={disabled} variant="primaryBlack">
              Sign in
            </Button>
            <Spacer mb={3} />
            <Flex flexDirection="row" justifyContent="center">
              <Text>
                <Sans size="1" color="black50">
                  Forgot your password?
                </Sans>{" "}
                <TouchableWithoutFeedback onPress={handleResetPassword}>
                  <Sans style={{ textDecorationLine: "underline" }} size="1" color={color("black50")}>
                    Reset it
                  </Sans>
                </TouchableWithoutFeedback>
              </Text>
            </Flex>
          </Box>
          <Box p={4} pb={5}>
            <Text style={{ textAlign: "center" }}>
              <Sans size="2" color="black50">
                Sign in using the same email and password you used for the waitlist.
              </Sans>
            </Text>
            <Spacer mb={2} />
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
