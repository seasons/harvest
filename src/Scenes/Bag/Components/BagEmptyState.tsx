import { Box, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import React from "react"
import { BagView } from "../Bag"

export const BagEmptyState: React.FC<{ currentView: BagView; wrapperHeight: number }> = ({
  currentView,
  wrapperHeight,
}) => {
  const title = currentView === BagView.Saved ? "Nothing saved" : "No history"
  const text =
    currentView === BagView.Saved ? "You haven’t saved any items." : "You haven't placed any reservations yet."

  return (
    <Box p={2} style={{ height: wrapperHeight }}>
      <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center" flexDirection="column">
        <Box>
          <Sans size="4" style={{ textAlign: "center" }}>
            {title}
          </Sans>
          <Spacer mb={1} />
          <Sans size="4" color={color("black50")} style={{ textAlign: "center" }}>
            {text}
          </Sans>
        </Box>
      </Flex>
    </Box>
  )
}
