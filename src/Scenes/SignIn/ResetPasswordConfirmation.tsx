import React from "react"
import { Box, Flex, CloseButton, Sans, Spacer, Container, Button } from "../../Components"
import { color } from "App/utils"

export const ResetPasswordConfirmation = (props: any) => {
  return (
    <Container backgroundColor="black100" insetsTop>
      <CloseButton navigation={props.navigation} />
      <Flex flexDirection="column" style={{ flex: 1 }}>
        <Box px={2} pt={2}>
          <Spacer mb={3} />
          <Sans size="3" color={color("white100")} weight="medium">
            Reset Password Link Sent
          </Sans>
          <Spacer mb={1} />
          <Sans size="2" color={color("black15")} weight="medium">
            Check your email for a link to reset your password.
          </Sans>
          <Spacer mb={3} />
          <Button block variant="primaryWhite" onPress={() => props.navigation.pop()}>
            Got it
          </Button>
        </Box>
      </Flex>
    </Container>
  )
}
