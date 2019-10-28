import React from "react"
import { Box, Sans, Spacer, Flex, Button } from "App/Components"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { BagPlaceHolderSVG } from "../../../../assets/svgs/BagPlaceHolder"
import { color } from "App/Utils"

export const AllCaughtUp: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  return (
    <Box style={{ backgroundColor: color("black") }}>
      <Spacer mb={4} />
      <Flex style={{ flex: 1 }} justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" flexDirection="row">
          <BagPlaceHolderSVG />
        </Flex>
        <Spacer mb={3} />
        <Sans size="2" color={color("white")} style={{ textAlign: "center" }}>
          You're all caught up!
        </Sans>
        <Spacer mb={0.5} />
        <Sans size="2" color={color("gray")} style={{ textAlign: "center" }}>
          Browse our entire collection
        </Sans>
        <Spacer mb={3} />
        <Flex justifyContent="center" flexDirection="row">
          <Button size="medium" variant="primaryLight" onPress={() => navigation.navigate("Browse")}>
            Browse
          </Button>
        </Flex>
      </Flex>
      <Spacer mb={150} />
    </Box>
  )
}
