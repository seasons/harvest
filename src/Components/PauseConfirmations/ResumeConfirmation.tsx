import { Flex, Container, Sans, Box, Spacer } from "App/Components"
import React from "react"
import { Check } from "Assets/svgs"
import { FixedButton } from "../FixedButton"

export const ResumeConfirmation: React.FC = () => {
  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between">
          <Box>
            <Spacer mb={100} />
            <Check />
            <Spacer mb={3} />
            <Sans size="3">Welcome back</Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50">
              Your membership has been reactivated and you’re ready to reserve your next order.
            </Sans>
          </Box>
          <Sans size="1" color="black50">
            Your credit card has been succesfully billed and your membership will automatically renew.
          </Sans>
          <FixedButton>Start reserving</FixedButton>
        </Flex>
      </Flex>
    </Container>
  )
}
