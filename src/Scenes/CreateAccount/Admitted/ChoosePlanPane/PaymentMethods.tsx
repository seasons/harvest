import { Box, Button, Sans, Spacer, Separator } from "App/Components"
import { AppleLogo } from "Assets/svgs/AppleLogo"
import { Dimensions } from "react-native"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const PaymentMethods = ({ onApplePay, onCreditCard }) => {
  const insets = useSafeAreaInsets()
  return (
    <Box pb={insets.bottom} px={2} style={{ width: windowWidth }}>
      <Spacer mb={4} />
      <Sans size="1">Select a payment type</Sans>
      <Spacer mb={2} />
      <Separator />
      <Spacer mb={3} />
      <Button block variant="primaryWhite" onPress={onCreditCard}>
        Credit card
      </Button>
      <Spacer mb={1} />
      <Button block Icon={AppleLogo} onPress={onApplePay}>
        Apple Pay
      </Button>
    </Box>
  )
}
