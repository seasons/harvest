import { Box, Button, Flex, Sans, Spacer, Theme } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import { Image } from "react-native"

export const EmptyState = ({ remainingPieces, navigation }) => {
  return (
    <Theme>
      <Box p={2} style={{ flex: 1 }}>
        <Box>
          <Sans size="3" color="black">
            My bag
          </Sans>
          <Sans size="2" color="gray">
            You have {remainingPieces} pieces remaining
          </Sans>
        </Box>
        <Flex style={{ flex: 1 }} justifyContent="center" flexDirection="column">
          <Flex justifyContent="center" flexDirection="row">
            <Image
              style={{ width: 200, height: 200, resizeMode: "contain" }}
              source={require("../../../../assets/images/EmptyBag.png")}
            />
          </Flex>
          <Spacer mb={3} />
          <Sans size="2" color={color("gray")} style={{ textAlign: "center" }}>
            You haven’t reserved anything yet. When you add an item, it’ll appear here
          </Sans>
          <Spacer mb={3} />
          <Flex justifyContent="center" flexDirection="row">
            <Button size="medium" variant="primaryDark" onPress={() => navigation.navigate("Browse")}>
              Browse
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Theme>
  )
}
