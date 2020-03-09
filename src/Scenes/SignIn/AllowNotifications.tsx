import React, { useState } from "react"
import { Sans, Flex, Spacer, Button, Container } from "App/Components"
import { NotificationGraphic } from "Assets/svgs"
import { color } from "App/Utils"
import { useNotificationsContext } from "App/Notifications/NotificationsContext"

export const AllowNotifications = ({ navigation, route }) => {
  const [isMutating, setIsMutating] = useState(false)
  const { requestPermissions, setDeviceNotifStatus } = useNotificationsContext()

  const callback = () => {
    setIsMutating(false)
    navigation.navigate("Main")
  }

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
            setDeviceNotifStatus("Denied")
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
