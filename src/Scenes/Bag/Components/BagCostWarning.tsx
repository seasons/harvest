import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { PopUp } from "App/Components/PopUp"
import { useAuthContext } from "App/Navigation/AuthContext"
import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

import { useNavigation } from "@react-navigation/native"

export const BagCostWarning = ({ show, setShow }) => {
  const navigation = useNavigation()

  const [isMutatingCTA, setIsMutatingCTA] = useState(false)

  const CancelButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setShow(false)}>
        <Sans size="4" style={{ textAlign: "center", textDecorationLine: "underline", width: "100%" }}>
          Cancel
        </Sans>
      </TouchableWithoutFeedback>
    )
  }

  const onCTAPress = () => {
    if (isMutatingCTA) {
      return
    }
    setIsMutatingCTA(true)
  }

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
        <Button block loading={isMutatingCTA} onPress={onCTAPress}>
          Ship now for $30
        </Button>
        <Spacer mb={2} />
        <Sans size="3" style={{ textAlign: "center" }} color="black50">
          You’ve already placed an order this month. Get an extra shipment now for $30 or wait until April 24.
        </Sans>
        <Spacer mb={3} />

        <Flex flexDirection="row" justifyContent="center">
          <CancelButton />
        </Flex>
      </Box>
      <Spacer mb={4} />
    </PopUp>
  )
}
