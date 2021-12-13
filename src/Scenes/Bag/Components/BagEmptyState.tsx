import { Box, Flex, Sans, Spacer } from "App/Components"
import { SavedAndHistoyView } from "App/Scenes/Account/SavedAndHistory/SavedAndHistory"
import { color } from "App/utils"
import React from "react"

export const BagEmptyState: React.FC<{ currentView: SavedAndHistoyView; wrapperHeight: number }> = ({
  currentView,
  wrapperHeight,
}) => {
  const title = currentView === SavedAndHistoyView.Saved ? "Nothing saved" : "No history"
  const text =
    currentView === SavedAndHistoyView.Saved
      ? "You haven’t saved any items."
      : "You haven't placed any reservations yet."

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
