import React, { useState, useEffect } from "react"
import { Spacer, Flex, Box, Toggle, Sans } from "App/Components"
import { color } from "App/utils"
import { Text, Linking, AppState } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { PushNotificationStatus } from "App/generated/globalTypes"
import { checkNotifications } from "react-native-permissions"
import { useNotificationsContext } from "App/Notifications/NotificationsContext"
import { useTracking, Schema } from "App/utils/track"

export const NotificationToggle: React.FC<{ userNotificationStatus: PushNotificationStatus; userID: string }> = ({
  userNotificationStatus,
}) => {
  const { requestPermissions, unsubscribe, init, subscribedToNotifs } = useNotificationsContext()
  const [isMutating, setIsMutating] = useState(false)
  const navigation = useNavigation()
  const tracking = useTracking()

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

  const onChange = async newValue => {
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
    tracking.trackEvent({
      actionName: Schema.ActionNames.NotificationToggleTapped,
      actionType: Schema.ActionTypes.Tap,
      newValue,
    })
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
        <Toggle
          disabled={disabled || isMutating}
          onChange={newValue => onChange(newValue)}
          selected={subscribedToNotifs}
        />
      </Flex>
      <Spacer m={2} />
    </Box>
  )
}
