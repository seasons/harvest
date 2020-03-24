import React from "react"
import { Text } from "react-native"
import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { screenTrack } from "App/utils/track"
import { Container } from "Components/Container"

export const ReservationFeedbackFinish: React.FC<{
  navigation: any
}> = screenTrack()(({ navigation }) => {
  return (
    <Container >
      <Box px={2} style={{ flex: 1, flexDirection: "column" }}>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ flex: 1 }} >
          <Sans size="3" color={"black100"}>
            Thank you
          </Sans>
          <Spacer mb={1} />
          <Text style={{ textAlign: "center" }}>
            <Sans size="1" color={"black50"}>
              Thank you for helping us improve your experience with this feedback.
            </Sans>
          </Text>
        </Flex>
        <Button block variant="primaryWhite" onPress={() => navigation.pop()}>
          Finish
        </Button>
        <Spacer mb={4} />
      </Box>
    </Container >
  )
})

