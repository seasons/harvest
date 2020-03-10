import React, { useState, useEffect } from "react"
import { Spacer, Flex, Box, Toggle, Sans } from "App/Components"
import { color } from "App/utils"
import { Text, Linking, AppState } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { PushNotificationStatus } from "App/generated/globalTypes"
import { checkNotifications } from "react-native-permissions"
import { useNotificationsContext } from "App/Notifications/NotificationsContext"

export const NotificationToggle: React.FC<{ userNotificationStatus: PushNotificationStatus; userID: string }> = ({
  userNotificationStatus,
}) => {
  const { requestPermissions, unsubscribe, init, subscribedToNotifs } = useNotificationsContext()
  const [isMutating, setIsMutating] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    // If user leaves the app to turn on notifications in the settings recheck status
    const unsubscribe = AppState.addEventListener("change", userNotificationStatus => {
      checkNotifications()
        .then(async ({ status }) => {
          if (userNotificationStatus && status !== userNotificationStatus?.toLowerCase()) {
            requestPermissions(null)
          }
        })
        .catch(error => {
          console.log("error checking for permission", error)
        })
    })
    return unsubscribe
  }, [navigation])

  const onChange = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    if (subscribedToNotifs) {
      unsubscribe()
    } else {
      if (userNotificationStatus === "Denied") {
        requestPermissions(null)
      } else {
        init()
      }
    }
    setIsMutating(false)
  }

  const disabled = userNotificationStatus === "Blocked"

  return (
    <Box px={2}>
      <Spacer m={2} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box style={{ maxWidth: 300 }}>
          <Sans size="2">Order updates</Sans>
          {disabled ? (
            <Sans size="2" color={color("black50")}>
              Enable push notifications in your{" "}
              <Text
                onPress={() => Linking.openSettings()}
                style={{ color: color("black100"), textDecorationLine: "underline" }}
              >
                device settings
              </Text>
              .
            </Sans>
          ) : (
            <Sans size="2" color={color("black50")}>
              Send me push notifications
            </Sans>
          )}
        </Box>
        <Toggle disabled={disabled || isMutating} onChange={onChange} selected={subscribedToNotifs} />
      </Flex>
      <Spacer m={2} />
    </Box>
  )
}
