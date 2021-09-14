import { Box, Button, Container, Flex, Sans, Spacer } from "App/Components"
import { seasonAndYear } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { SeasonsCircleSVG } from "Assets/svgs"
import React from "react"
import { Linking, StatusBar, TouchableOpacity } from "react-native"
import { Text } from "react-native-animatable"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const GuestView = ({ navigation }) => {
  const tracking = useTracking()
  const insets = useSafeAreaInsets()

  return (
    <Container insetsTop={false} style={{ backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <Flex
        style={{ flex: 1, paddingTop: insets.top, backgroundColor: "black" }}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex px={2} style={{ flex: 1 }} flexDirection="column" justifyContent="space-between" pt={5}>
          <SeasonsCircleSVG width={80} height={80} color="white" />
          <Flex>
            <Sans size="8" color="white100">
              Wear. Swap. Repeat.
            </Sans>
            <Spacer mb={1} />
            <Sans size="5" color="black25">
              Seasons is a private rental service exploring the shared access of fashion.{" "}
              <Text style={{ textDecorationLine: "underline" }}>{seasonAndYear()}</Text> applications are now open.
            </Sans>
            <Spacer mb={5} />
            <Button
              block
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.CreateAnAccountTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                navigation.navigate("Modal", { screen: "CreateAccountModal" })
              }}
              size="large"
              variant="secondaryWhite"
            >
              Apply for membership
            </Button>
            <Spacer mb={1} />
            <Button
              block
              size="large"
              onPress={() => navigation.navigate("Modal", { screen: "SignInModal" })}
              variant="secondaryBlack"
            >
              Sign in
            </Button>
            <Spacer mb={3} />
            <Flex flexDirection="row" justifyContent="center">
              <TouchableOpacity onPress={() => Linking.openURL(`mailto:membership@seasons.nyc`)}>
                <Sans size="4" color="white100" style={{ textDecorationLine: "underline" }}>
                  Contact us
                </Sans>
              </TouchableOpacity>
              <Spacer mr={4} />
              <Box backgroundColor="white100" style={{ width: 1 }} />
              <Spacer mr={4} />
              <TouchableOpacity onPress={() => navigation.navigate("Webview", { uri: "https://www.wearseasons.com" })}>
                <Sans size="4" color="white100" style={{ textDecorationLine: "underline" }}>
                  Learn more
                </Sans>
              </TouchableOpacity>
            </Flex>
            <Spacer mb={5} />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
