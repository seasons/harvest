import React from "react"
import { Flex, Button, Container, Sans, Box, Spacer } from "App/Components"

export const BagGuestView = ({ navigation }) => {
  return (
    <Container>
      <Flex style={{ flex: 1 }} alignContent="center" flexDirection="column" justifyContent="center">
        <Box px={2}>
          <Sans size="1" textAlign="center">
            Please sign in to view your bag
          </Sans>
          <Spacer mb={2} />
          <Button variant="primaryBlack" onPress={() => navigation.navigate("Modal", { screen: "SignInModal" })} block>
            Sign in
          </Button>
        </Box>
      </Flex>
    </Container>
  )
}
