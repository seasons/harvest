import { Box, Button, Container, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { SeasonsCircleSVG } from "Assets/svgs"
import React from "react"
import { TouchableOpacity, Linking } from "react-native"
import { Schema, useTracking } from "App/utils/track"

export const GuestView = ({ navigation }) => {
  const tracking = useTracking()
  return (
    <Container>
      <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between">
        <Box px={2}>
          <Spacer mb={64} />
          <SeasonsCircleSVG width={60} height={60} />
          <Spacer mb={64} />
          <Sans color={color("black100")} size="7">
            Wear. Swap. Repeat.
          </Sans>
          <Spacer mb={0.5} />
          <Box pr={3}>
            <Sans size="4" color={color("black50")}>
              A members-only rental service for designer menswear. Access hundreds of styles and discover new brands
              with zero commitment.
            </Sans>
          </Box>
        </Box>
        <Box px={2}></Box>
        <Box px={2}>
          <Button
            block
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.CreateAnAccountTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              navigation.navigate("Modal", { screen: "CreateAccountModal" })
            }}
            variant="primaryBlack"
          >
            Create an account
          </Button>
          <Spacer mb={1} />
          <Button
            block
            onPress={() => navigation.navigate("Modal", { screen: "SignInModal" })}
            variant="secondaryWhite"
          >
            Sign in
          </Button>
          <Spacer mb={3} />
          <Flex flexDirection="row" justifyContent="center">
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:membership@seasons.nyc`)}>
              <Sans size="4" color={color("black50")} style={{ textDecorationLine: "underline" }}>
                Contact us
              </Sans>
            </TouchableOpacity>
            <Spacer mr={4} />
            <Box backgroundColor="black10" style={{ width: 1 }} />
            <Spacer mr={4} />
            <TouchableOpacity onPress={() => navigation.navigate("Webview", { uri: "https://www.seasons.nyc" })}>
              <Sans size="4" color={color("black50")} style={{ textDecorationLine: "underline" }}>
                Learn more
              </Sans>
            </TouchableOpacity>
          </Flex>
          <Spacer mb={2} />
        </Box>
      </Flex>
    </Container>
  )
}
