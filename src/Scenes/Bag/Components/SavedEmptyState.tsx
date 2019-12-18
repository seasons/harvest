import { Box, Button, Flex, Sans, Spacer, Theme } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import { Image } from "react-native"

export const SavedEmptyState = ({ navigation }) => {
  return (
    <Theme>
      <Box p={2} pt={4} style={{ flex: 1 }}>
        <Flex style={{ flex: 1 }} justifyContent="center" flexDirection="column">
          <Box>
            <Flex justifyContent="center" flexDirection="row">
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={require("../../../../assets/images/Empty_Bag.png")}
              />
            </Flex>
            <Spacer mb={3} />
            <Sans size="2" color={color("gray")} style={{ textAlign: "center" }}>
              You haven’t saved any pieces yet. Anything you save will appear here
            </Sans>
            <Spacer mb={3} />
            <Flex justifyContent="center" flexDirection="row">
              <Button size="medium" variant="primaryDark" onPress={() => navigation.navigate("Browse")}>
                Browse
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Theme>
  )
}
