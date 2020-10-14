import { Box, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import React from "react"
import { Dimensions } from "react-native"
import { BagView } from "../Bag"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const BagEmptyState: React.FC<{ currentView: BagView }> = ({ currentView }) => {
  const insets = useSafeAreaInsets()
  const { height } = Dimensions.get("window")
  const rowHeight = height - 140 - insets.top
  const title = currentView === BagView.Saved ? "Nothing saved" : "No history"
  const text =
    currentView === BagView.Saved ? "You haven’t saved any items." : "You haven't placed any reservations yet."
  return (
    <Box p={2} style={{ height: rowHeight }}>
      <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center" flexDirection="column">
        <Box>
          <Sans size="1" style={{ textAlign: "center" }}>
            {title}
          </Sans>
          <Spacer mb={1} />
          <Sans size="1" color={color("black50")} style={{ textAlign: "center" }}>
            {text}
          </Sans>
        </Box>
      </Flex>
    </Box>
  )
}
