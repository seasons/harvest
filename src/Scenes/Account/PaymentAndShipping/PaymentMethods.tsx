import { Box, Button, Sans, Spacer, Separator } from "App/Components"
import { AppleLogo } from "Assets/svgs/AppleLogo"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { space } from "App/utils"

const windowDimensions = Dimensions.get("window")
const windowWidth = windowDimensions.width

export const PaymentMethods = ({ onApplePay, onCreditCard, setOpenPopUp }) => {
  const insets = useSafeAreaInsets()
  return (
    <Box pb={insets.bottom + space(4)} px={2} style={{ width: windowWidth }}>
      <Spacer mb={4} />
      <Sans size="4">Select a payment type</Sans>
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
      {!!setOpenPopUp && (
        <>
          <TouchableWithoutFeedback onPress={() => setOpenPopUp(false)}>
            <Sans size="4" style={{ textAlign: "center", textDecorationLine: "underline", width: "100%" }}>
              Cancel
            </Sans>
          </TouchableWithoutFeedback>
          <Spacer mb={1} />
        </>
      )}
    </Box>
  )
}
