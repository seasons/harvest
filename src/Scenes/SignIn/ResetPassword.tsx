import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { Box, Button, Flex, CloseButton, Sans, Spacer, TextInput, Container } from "../../Components"
import { isValidEmail } from "../../helpers/regex"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import * as Sentry from "@sentry/react-native"

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`

export const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("")
  const [isEmailComplete, setIsEmailComplete] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const popUpData = {
    title: "Your email didn’t work!",
    note: "We couldn’t find an account tied to this email. Double check and try again.",
    buttonText: "Got it",
    onClose: () => hidePopUp(),
  }

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onError: (error) => {
      console.log("SignIn/ResetPassword.tsx: ", error)
      Sentry.captureException(error)
      Keyboard.dismiss()
      showPopUp(popUpData)
    },
  })

  const onEmailChange = (val) => {
    setEmail(val)
    setIsEmailComplete(isValidEmail(val))
  }

  const handleSendLink = async () => {
    const result = await resetPassword({
      variables: {
        email,
      },
    })

    if (result && result.data && result.data.resetPassword) {
      props.navigation.goBack()
      props.navigation.navigate("Modal", { screen: "ResetPasswordConfirmationModal" })
    } else {
      Keyboard.dismiss()
      showPopUp(popUpData)
    }
  }

  return (
    <Container backgroundColor="black100" insetsBottom={false}>
      <CloseButton />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
          <Box px={2}>
            <Spacer mb={5} />
            <Sans size="3" color="white" weight="medium">
              Reset Password
            </Sans>
            <Spacer mb={14} />
            <Sans size="2" color="rgba(255, 255, 255, 0.5)" weight="medium">
              Enter your email and we'll promptly send you a link to reset your password.
            </Sans>
            <Spacer mb={32} />
            <TextInput
              placeholder="Your email"
              variant="dark"
              textContentType="Email"
              inputKey="email"
              onChangeText={(_, val) => onEmailChange(val)}
            />
            <Spacer mb={4} />
            <Button block onPress={handleSendLink} disabled={!isEmailComplete} variant="primaryWhite">
              Reset
            </Button>
          </Box>
        </Flex>
      </TouchableWithoutFeedback>
    </Container>
  )
}
