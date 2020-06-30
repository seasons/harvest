import { Box, Button, Container, Sans, Spacer } from "App/Components"
import { GreenCheck } from "Assets/svgs"
import React from "react"
import { useSafeArea } from "react-native-safe-area-context"

interface WelcomePaneProps {
  onPressGetStarted: () => void
}

export const WelcomePane: React.FC<WelcomePaneProps> = ({ onPressGetStarted }) => {
  const insets = useSafeArea()

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box p="2" pt={insets.top}>
        <Spacer height="90" />
        <GreenCheck width={42} height={42} />
        <Spacer mb="3" />
        <Sans color="black100" size="3">
          Welcome to Seasons
        </Sans>
        <Spacer height="12" />
        <Sans color="black50" size="2">
          Your membership is active and you're ready to start reserving. Tap below to get started
        </Sans>
      </Box>
      <Box p="2" pb={insets.bottom} style={{ position: "absolute", bottom: 0 }}>
        <Sans color="black50" size="1">
          Your credit card has been succesfully billed and your membership will automatically renew on June 12.
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
