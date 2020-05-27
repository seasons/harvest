import { Flex, Container, Sans, Box, Spacer, Button } from "App/Components"
import React from "react"
import { Check } from "Assets/svgs"
import { Linking } from "react-native"

export const PauseConfirmation: React.FC = () => {
  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between">
          <Box>
            <Spacer mb={100} />
            <Check />
            <Spacer mb={3} />
            <Sans size="3">You’ve successfully paused your membership</Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50">
              If you have an active reservation, please remember to return your items before May 18.
            </Sans>
          </Box>
          <Box>
            <Sans size="1" color="black50">
              If we do not receive your items back on or before this date, your membership will automatically resume and
              you will be billed. If you have any questions, contact us below at membership@seasons.nyc
            </Sans>
          </Box>
          <Button onPress={null}>Finish</Button>
          <Button onPress={() => Linking.openURL(`mailto:membership@seasons.nyc?subject="Membership question"`)}>
            Contact us
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}
