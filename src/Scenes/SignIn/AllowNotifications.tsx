import React, { useState } from "react"
import { Sans, Flex, Spacer, Button, Container } from "App/Components"
import { NotificationGraphic } from "Assets/svgs"
import { color } from "App/utils"
import { useNotificationsContext } from "App/Notifications/NotificationsContext"

export const AllowNotifications = ({ navigation }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { requestPermissions } = useNotificationsContext()

  const callback = (_status) => {
    setIsMutating(false)
    navigation.navigate("Main")
  }

  return (
    <Container insetsBottom>
      <Flex px={2} flexDirection="column" justifyContent="center" alignItems="center" style={{ flex: 1 }}>
        <NotificationGraphic />
      </Flex>
      <Flex px={2}>
        <Sans color={color("black100")} size="7">
          Allow notifications
        </Sans>
        <Sans color={color("black50")} size="4">
          Get notified about your order status, new products, and restocks. Never miss an update.
        </Sans>
        <Spacer mb={3} />
        <Button
          block
          onPress={() => {
            if (isMutating) {
              return
            } else {
              setIsMutating(true)
              requestPermissions(callback)
            }
          }}
          variant="primaryBlack"
        >
          Allow
        </Button>
        <Spacer mb={2} />
        <Button
          block
          onPress={() => {
            navigation.navigate("Main")
          }}
          variant="primaryWhite"
        >
          Maybe later
        </Button>
        <Spacer mb={3} />
      </Flex>
    </Container>
  )
}
