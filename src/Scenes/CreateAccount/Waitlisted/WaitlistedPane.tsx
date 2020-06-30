import { Box, Button, Container, Sans, Spacer } from "App/Components"
import { GreenCheck } from "Assets/svgs"
import React from "react"
import { useSafeArea } from "react-native-safe-area-context"

interface WaitlistedPaneProps {
  onPressGetStarted: () => void
}

export const WaitlistedPane: React.FC<WaitlistedPaneProps> = ({ onPressGetStarted }) => {
  const insets = useSafeArea()

  // fix bottom, button text; check color to black100

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box p="2" pt={insets.top}>
        <Spacer height="90" />
        <GreenCheck width={42} height={42} />
        <Spacer mb="3" />
        <Sans color="black100" size="3">
          You're on the waitlist
        </Sans>
        <Spacer height="12" />
        <Sans color="black50" size="2">
          We’ll send you a notification when your account is ready and you’re able to choose your plan.
        </Sans>
      </Box>
      <Box p="2" pb={insets.bottom} style={{ position: "absolute", bottom: 0 }}>
        <Sans color="black50" size="1">
          Bottom text :)
        </Sans>
        <Spacer mb="3" />
        <Button block onPress={onPressGetStarted} variant="primaryBlack">
          Get started
        </Button>
        <Spacer mb="3" />
      </Box>
    </Container>
  )
}
