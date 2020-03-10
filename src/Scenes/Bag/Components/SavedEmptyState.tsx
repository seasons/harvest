import { Box, Button, Flex, Sans, Spacer, Theme } from "App/Components"
import { color } from "App/utils"
import React from "react"
import { Dimensions } from "react-native"

export const SavedEmptyState = ({ navigation }) => {
  const { height } = Dimensions.get("window")
  const rowHeight = height - 300
  return (
    <Theme>
      <Box p={2} style={{ height: rowHeight }}>
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center" flexDirection="column">
          <Box>
            <Sans size="3" style={{ textAlign: "center" }}>
              Nothing saved
            </Sans>
            <Spacer mb={1} />
            <Sans size="2" color={color("black50")} style={{ textAlign: "center" }}>
              You haven’t saved any pieces yet. All your saved pieces will live here.
            </Sans>
          </Box>
        </Flex>
      </Box>
    </Theme>
  )
}
