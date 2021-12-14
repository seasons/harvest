import { Box, Flex, Sans, Spacer } from "App/Components"
import { SavedAndHistoryView } from "App/Scenes/Account/SavedAndHistory/SavedAndHistory"
import { color } from "App/utils"
import React from "react"

export const BagEmptyState: React.FC<{ currentView: SavedAndHistoryView; wrapperHeight: number }> = ({
  currentView,
  wrapperHeight,
}) => {
  const title = currentView === SavedAndHistoryView.Saved ? "Nothing saved" : "No history"
  const text =
    currentView === SavedAndHistoryView.Saved
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
