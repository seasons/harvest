import { Box, Button, Sans, Spacer, Separator } from "App/Components"
import { AppleLogo } from "Assets/svgs/AppleLogo"
import { Dimensions } from "react-native"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const PaymentMethods = ({ onApplePay, setOpenPopUp, onCreditCard }) => {
  const insets = useSafeAreaInsets()
  return (
    <Box pb={insets.bottom} px={2} style={{ width: windowWidth }}>
      <Spacer mb={4} />
      <Sans size="1" style={{ textAlign: "center" }}>
        Select payment type
      </Sans>
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
      <Spacer mb={3} />
      <Sans
        size="1"
        style={{ textAlign: "center", textDecorationLine: "underline" }}
        onPress={() => setOpenPopUp(false)}
      >
        Cancel
      </Sans>
      <Spacer mb={4} />
    </Box>
  )
}
