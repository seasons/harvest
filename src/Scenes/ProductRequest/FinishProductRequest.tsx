import React from "react"
import { Box, Container, FixedButton, Sans, Spacer } from "App/Components"
import { color } from "App/Utils"
import { StackActions } from "react-navigation"

export const FinishProductRequest = (props: any) => {
  const handleFinishBtnPressed = () => {
    props.navigation.dispatch(StackActions.popToTop())
  }

  return (
    <Container>
      <Box px={2} style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        <Box>
          <Sans size="3" color={color("black100")} textAlign="center">
            We're on it!
          </Sans>
          <Spacer mb={14} />
          <Sans size="2" color={color("black50")} textAlign="center">
            Thanks for your submission. We’ll take a look and let you know if we carry it.
          </Sans>
        </Box>
      </Box>
      <FixedButton block variant="primaryWhite" onPress={handleFinishBtnPressed}>
        Finish
      </FixedButton>
    </Container>
  )
}
