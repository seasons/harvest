import { Flex, Container, Sans, Box, Spacer } from "App/Components"
import React from "react"
import { Check } from "Assets/svgs"
import { FixedButton } from "../FixedButton"

export const ExtendPauseConfirmation: React.FC = () => {
  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between">
          <Box>
            <Spacer mb={100} />
            <Check />
            <Spacer mb={3} />
            <Sans size="3">You’re membership is paused for another month</Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50">
              It will automatically resume June 18.
            </Sans>
          </Box>
          <Sans size="1" color="black50">
            If you change your mind, you can still resume your membership before this date.
          </Sans>
          <FixedButton>Finish</FixedButton>
        </Flex>
      </Flex>
    </Container>
  )
}
