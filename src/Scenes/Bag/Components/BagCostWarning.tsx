import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { PopUp } from "App/Components/PopUp"
import { space } from "App/utils/space"
import { DateTime } from "luxon"
import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

export const BagCostWarning = ({ show, onCTAPress, onCancel, nextFreeSwapDate }) => {
  const [isMutatingCTA, setIsMutatingCTA] = useState(false)

  return (
    <PopUp show={show}>
      <Spacer mb={4} />
      <Sans size="4" style={{ textAlign: "center" }}>
        {`Heads up, this will be extra`}
      </Sans>
      <Spacer mb={2} />
      <Separator />
      <Spacer mb={3} />
      <Box px={2}>
        <Button
          block
          loading={isMutatingCTA}
          onPress={async () => {
            if (isMutatingCTA) {
              return
            }
            setIsMutatingCTA(true)
            await onCTAPress()
            setIsMutatingCTA(false)
          }}
        >
          Ship now for $30
        </Button>
        <Spacer mb={2} />
        <Sans size="3" style={{ textAlign: "center" }} color="black50">
          You’ve already placed an order this month. Get an extra shipment now for{" "}
          <Sans size="3" color="black50" style={{ textDecorationLine: "underline" }}>
            $30
          </Sans>{" "}
          or wait until{" "}
          <Sans size="3" color="black50" style={{ textDecorationLine: "underline" }}>{`${DateTime.fromISO(
            nextFreeSwapDate
          ).toFormat("LLLL d")}.`}</Sans>
        </Sans>
        <Spacer mb={3} />

        <Flex flexDirection="row" justifyContent="center">
          <TouchableWithoutFeedback onPress={onCancel}>
            <Sans size="4" style={{ textAlign: "center", textDecorationLine: "underline", width: "100%" }}>
              Cancel
            </Sans>
          </TouchableWithoutFeedback>
        </Flex>
      </Box>
      <Spacer mb={space(4) + 100} />
    </PopUp>
  )
}
