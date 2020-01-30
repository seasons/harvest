import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import { Image } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"

export const AllCaughtUp: React.FC<{ navigation: NavigationScreenProp<NavigationState, NavigationParams> }> = ({
  navigation,
}) => {
  return (
    <Box style={{ backgroundColor: color("black100") }}>
      <Spacer mb={100} />
      <Flex style={{ flex: 1 }} justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" flexDirection="row">
          <Image
            style={{ width: 160, height: 160, resizeMode: "contain" }}
            source={require("../../../../assets/images/CaughtUpAsset.png")}
          />
        </Flex>
        <Spacer mb={3} />
        <Sans size="2" color={color("white100")} style={{ textAlign: "center" }}>
          You're all caught up!
        </Sans>
        <Spacer mb={0.5} />
        <Sans size="2" color={color("black50")} style={{ textAlign: "center" }}>
          Browse our entire collection
        </Sans>
        <Spacer mb={3} />
        <Flex justifyContent="center" flexDirection="row">
          <Button size="medium" variant="primaryGray" onPress={() => navigation.navigate("Browse")}>
            Browse
          </Button>
        </Flex>
      </Flex>
      <Spacer mb={100} />
    </Box>
  )
}
