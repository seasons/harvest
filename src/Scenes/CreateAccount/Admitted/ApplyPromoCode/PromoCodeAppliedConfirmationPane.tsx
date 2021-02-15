import { Box, Button, Container, Flex, Sans, Spacer } from "App/Components"
import { CheckCircled } from "Assets/svgs"
import React from "react"

interface PromoCodeAppliedConfirmationPaneProps {
  onComplete: () => void
}

export const PromoCodeAppliedConfirmationPane: React.FC<PromoCodeAppliedConfirmationPaneProps> = ({ onComplete }) => {
  return (
    <Container>
      <Flex style={{ flex: 1 }}>
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between" px={2}>
          <Box>
            <Spacer mb={50} />
            <CheckCircled />
            <Spacer mb={3} />
            <Sans size="7">You're all set</Sans>
            <Spacer mb={1} />
            <Sans size="4" color="black50">
              Your promo code has been successfully applied.
            </Sans>
          </Box>
          <Box>
            <Button block onPress={onComplete}>
              Done
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
