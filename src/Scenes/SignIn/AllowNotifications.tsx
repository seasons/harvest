import React from "react"
import { Sans, Flex, Spacer, Button, Container } from "App/Components"
import { NotificationGraphic } from "Assets/svgs"
import { init } from "../../setupNotifications"
import { color } from "App/Utils"

export const AllowNotifications = ({ navigation }) => {
  return (
    <Container insetsBottom>
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
        <Button block onPress={() => navigation.navigate("Main")} variant="primaryWhite">
          Maybe Later
        </Button>
        <Spacer mb={3} />
      </Flex>
    </Container>
  )
}
