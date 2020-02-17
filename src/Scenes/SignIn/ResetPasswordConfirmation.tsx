import React from "react"
import { Keyboard, TouchableWithoutFeedback } from "react-native"
import { Box, Flex, ModalCloseButton, Sans, Spacer, Container } from "../../Components"
import { color } from "App/Utils"

export const ResetPasswordConfirmation = (props: any) => {
  return (
    <Container backgroundColor="black100">
      <ModalCloseButton navigation={props.navigation} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Flex flexDirection="column" style={{ flex: 1 }}>
          <Box px={2} pt={2}>
            <Sans size="3" color={color("white100")} weight="medium">
              Reset Password Link Sent
            </Sans>
            <Spacer mb={1} />
            <Sans size="2" color={color("black15")} weight="medium">
              Check your email for a link to reset your password.
            </Sans>
          </Box>
        </Flex>
      </TouchableWithoutFeedback>
    </Container>
  )
}
