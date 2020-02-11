import React from "react"
import { Theme, Sans, Flex, Spacer, Button } from "App/Components"
import { SafeAreaView } from "react-native"
import { NotificationGraphic } from "Assets/svgs"
import { init } from "../../setupNotifications"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import { color } from "App/Utils"

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export class AllowNotifications extends React.Component<Props> {
  render() {
    const { navigation } = this.props
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Theme>
          <Flex px={2} flexDirection="column" justifyContent="center" alignItems="center" style={{ flex: 1 }}>
            <NotificationGraphic />
          </Flex>
          <Flex px={2}>
            <Sans color={color("black100")} size="3">
              Allow notifications
            </Sans>
            <Sans color={color("black50")} size="1">
              Get notified about your order status, new products, and restocks. Never miss an update.
            </Sans>
            <Spacer mb={3} />
            <Button block onPress={() => init(navigation)} variant="primaryBlack">
              Allow
            </Button>
            <Spacer mb={2} />
            <Button block onPress={() => navigation.navigate("Home")} variant="primaryWhite">
              Maybe Later
            </Button>
            <Spacer mb={3} />
          </Flex>
        </Theme>
      </SafeAreaView>
    )
  }
}
