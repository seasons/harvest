import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"

export const AllCaughtUp: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  return (
    <Box style={{ backgroundColor: color("black100") }}>
      <Spacer mb={80} />
      <Flex style={{ flex: 1 }} justifyContent="center" flexDirection="column">
        <Sans size="2" color={color("white100")} style={{ textAlign: "center" }}>
          You're all caught up!
        </Sans>
        <Spacer mb={0.5} />
        <Sans size="2" color={color("black50")} style={{ textAlign: "center" }}>
          Browse our entire collection
        </Sans>
        <Spacer mb={3} />
        <Flex justifyContent="center" flexDirection="row">
          <Button variant="secondaryBlack" onPress={() => navigation.navigate("Browse")}>
            Browse
          </Button>
        </Flex>
      </Flex>
      <Spacer mb={180} />
    </Box>
  )
}
