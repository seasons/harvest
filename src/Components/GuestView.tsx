import React from "react"
import { Flex, Button, Container, Sans, Box, Spacer } from "App/Components"
import { SeasonsLogoSVG } from "Assets/svgs"
import { color, space } from "App/utils"
import { TouchableOpacity, Linking, Dimensions } from "react-native"

const buttonWidth = (Dimensions.get("window").width - space(4)) / 2 - 1

export const GuestView = ({ navigation }) => {
  return (
    <Container>
      <Flex style={{ flex: 1 }} alignContent="center" flexDirection="column" justifyContent="flex-end">
        <Box px={2}>
          <SeasonsLogoSVG width={40} height={40} />
          <Spacer mb={40} />
          <Sans color={color("black100")} size="3">
            Welcome to Seasons.
          </Sans>
          <Box pr={3}>
            <Sans size="3" color={color("black50")}>
              Sign in to start reserving or join the waitlist to secure your spot and get an invite.
            </Sans>
          </Box>
          <Spacer mb={40} />
          <Button variant="primaryBlack" onPress={() => navigation.navigate("Modal", { screen: "SignInModal" })} block>
            Sign in
          </Button>
          <Spacer mb={1} />
          <Button
            variant="primaryWhite"
            onPress={() => navigation.navigate("Webview", { uri: "http://signup.seasons.nyc/" })}
            block
          >
            Join the waitlist
          </Button>
          <Spacer mb={40} />
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" alignItem="center">
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:membership@seasons.nyc`)}>
              <Flex style={{ width: buttonWidth }} flexDirection="row" justifyContent="center">
                <Sans size="2" color={color("black50")}>
                  Contact
                </Sans>
              </Flex>
            </TouchableOpacity>
            <Box style={{ height: 28, width: 1, backgroundColor: color("black50") }} />
            <TouchableOpacity onPress={() => navigation.navigate("Webview", { uri: "https://www.seasons.nyc" })}>
              <Flex style={{ width: buttonWidth }} flexDirection="row" justifyContent="center">
                <Sans size="2" color={color("black50")}>
                  Learn More
                </Sans>
              </Flex>
            </TouchableOpacity>
          </Flex>
          <Spacer mb={40} />
        </Box>
      </Flex>
    </Container>
  )
}
