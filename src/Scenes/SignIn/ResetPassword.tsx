import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "react-apollo"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { Box, Button, PopUp, Flex, ModalCloseButton, Sans, Spacer, TextInput, Theme } from "../../Components"
import { isValidEmail } from "../../helpers/regex"
import styled from "styled-components/native"

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
  const [showError, setShowError] = useState(false)

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onError: error => {
      console.log("SignIn/ResetPassword.tsx: ", error)
      Keyboard.dismiss()
      setShowError(true)
    },
  })

  const onEmailChange = val => {
    setEmail(val)
    setIsEmailComplete(isValidEmail(val))
  }

  const handleSendLink = async () => {
    const result = await resetPassword({
      variables: {
        email,
      },
    })

    if (result.data && result.data.resetPassword) {
      props.navigation.navigate("ResetPasswordConfirmation")
    } else {
      Keyboard.dismiss()
      setShowError(true)
    }
  }

  const insets = useSafeArea()

  return (
    <Theme>
      <Container px={2} pt={insets.top}>
        <ModalCloseButton navigation={props.navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Flex flexDirection="column" justifyContent="space-between" style={{ flex: 1 }}>
            <Box style={{ marginTop: 8 }} m={2}>
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
                textContentType="email"
                onChangeText={(_, val) => onEmailChange(val)}
              />
              <Spacer mb={4} />
              <Button onPress={handleSendLink} disabled={!isEmailComplete} variant="primaryBlack">
                Send reset link
              </Button>
            </Box>
          </Flex>
        </TouchableWithoutFeedback>
      </Container>
      <PopUp
        buttonText="Got it"
        note="We couldn’t find an account tied to this email. Double check and try again."
        title="Your email didn’t work!"
        theme="light"
        show={showError}
        onClose={() => setShowError(false)}
      />
    </Theme>
  )
}

const Container = styled(Box)`
  background: black;
  flex: 1;
`
