import React from "react"
import { Flex, Container, Sans, Box, Spacer } from "App/Components"
import { SeasonsLogoSVG } from "Assets/svgs"
import { color } from "App/utils"
import { TouchableOpacity, Linking, Text } from "react-native"
import { Separator } from "./Separator"
import { ButtonWithArrow } from "./ButtonWithArrow"

export const GuestView = ({ navigation }) => {
  return (
    <Container>
      <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between">
        <Box px={2}>
          <Spacer mb={64} />
          <SeasonsLogoSVG width={40} height={40} />
          <Spacer mb={64} />
          <Sans color={color("black100")} size="3">
            Join the community
          </Sans>
          <Spacer mb={0.5} />
          <Box pr={3}>
            <Sans size="2" color={color("black50")}>
              Sign in to start reserving or join the waitlist to secure your spot and get an invite.
            </Sans>
          </Box>
        </Box>
        <Box px={2}></Box>
        <Box px={2}>
          <ButtonWithArrow onPress={() => navigation.navigate("Webview", { uri: "http://signup.seasons.nyc/" })}>
            Join the waitlist
          </ButtonWithArrow>
          <Spacer mb={3} />
          <Flex flexDirection="row">
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:membership@seasons.nyc`)}>
              <Sans size="2" color={color("black50")} style={{ textDecorationLine: "underline" }}>
                Contact
              </Sans>
            </TouchableOpacity>
            <Spacer mr={3} />
            <TouchableOpacity onPress={() => navigation.navigate("Webview", { uri: "https://www.seasons.nyc" })}>
              <Sans size="2" color={color("black50")} style={{ textDecorationLine: "underline" }}>
                Learn more
              </Sans>
            </TouchableOpacity>
          </Flex>
          <Spacer mb={5} />
          <Separator />
          <Spacer mb={2} />
          <Text>
            <Sans size="2" color={color("black50")}>
              Already a member?
            </Sans>{" "}
            <Sans
              size="2"
              color={color("black50")}
              style={{ textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("Modal", { screen: "SignInModal" })}
            >
              Login
            </Sans>
            <Spacer mb={2} />
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}
