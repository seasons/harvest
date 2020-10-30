import React, { useEffect, useState } from "react"
import { PopUp } from "App/Components/PopUp"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Box, Button, Sans, Spacer } from "App/Components"
import { Dimensions } from "react-native"
import { color } from "App/utils"

export const AllAccessDisabledPopup = ({ show, onPress }) => {
  const insets = useSafeAreaInsets()
  return (
    <PopUp show={show}>
      <Box pb={insets.bottom} px={2} style={{ width: Dimensions.get("window").width }}>
        <Spacer my={20} />
        <Sans size="2" color={color("black")}>
          Not available in your city yet
        </Sans>
        <Spacer mt={1} />
        <Sans size="1" color={color("black50")}>
          We're currently in beta and All Access is disabled in your area due to shipping time.
        </Sans>
        <Spacer my={2} />
        <Button block variant="primaryWhite" onPress={onPress}>
          Got it
        </Button>
        <Spacer my={2} />
      </Box>
    </PopUp>
  )
}
