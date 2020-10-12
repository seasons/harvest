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
            <Sans size="3">You're all set</Sans>
            <Spacer mb={1} />
            <Sans size="1" color="black50">
              Your promo code has been successfully applied.
            </Sans>
          </Box>
          <Box>
            <Sans size="1" color="black50">
              Your promo code has been successfully applied.
            </Sans>
            <Spacer mb={3} />
            <Button block onPress={onComplete}>
              Done
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}
