import { Box, Button, Container, Sans, Spacer } from "App/Components"
import { CheckCircled } from "Assets/svgs"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface WaitlistedPaneProps {
  onPressFinish: () => void
}

export const WaitlistedPane: React.FC<WaitlistedPaneProps> = ({ onPressFinish }) => {
  const insets = useSafeAreaInsets()

  return (
    <Container insetsBottom={false} insetsTop={false}>
      <Box p="2" pt={insets.top}>
        <Spacer height="90" />
        <CheckCircled backgroundColor="black100" width={42} height={42} />
        <Spacer mb="3" />
        <Sans color="black100" size="3">
          You're on the waitlist
        </Sans>
        <Spacer height="12" />
        <Sans color="black50" size="1">
          We’ll send you a notification when your account is ready and you’re able to choose your plan.
        </Sans>
      </Box>
      <Box p="2" pb={insets.bottom} style={{ position: "absolute", bottom: 0 }}>
        <Sans color="black50" size="0.5">
          In the meantime, you can finish completing your profile to help us prioritize your membership.
        </Sans>
        <Spacer mb="3" />
        <Button block onPress={onPressFinish} variant="primaryBlack">
          Finish
        </Button>
        <Spacer mb="3" />
      </Box>
    </Container>
  )
}
