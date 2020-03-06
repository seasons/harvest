import React, { useState, useEffect } from "react"
import { Separator, Spacer, Flex, Box, Toggle, Sans } from "App/Components"
import { color } from "App/Utils"
import { unsubscribe, requestPermission, seasonsNotifInterest } from "App/setupNotifications"
import AsyncStorage from "@react-native-community/async-storage"
import { useMutation } from "react-apollo"
import { Text, Linking } from "react-native"
import { GET_USER } from "../Account"
import { useNavigation } from "@react-navigation/native"
import { UPDATE_USER_PUSH_NOTIFICATIONS } from "App/Scenes/SignIn/AllowNotifications"
import { PushNotificationStatus } from "App/generated/globalTypes"

export const NotificationToggle: React.FC<{ userNotificationStatus: PushNotificationStatus }> = ({
  userNotificationStatus,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const navigation = useNavigation()
  const [updateUserPushNotifications] = useMutation(UPDATE_USER_PUSH_NOTIFICATIONS, {
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  })

  const setUserNotifs = async status => {
    await updateUserPushNotifications({
      variables: {
        pushNotificationsStatus: status,
      },
    })
    setIsMutating(false)
  }

  const onChange = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    if (userNotificationStatus === "Denied") {
      const beamsData = await AsyncStorage.getItem("beamsData")
      try {
        const { beamsToken, email } = JSON.parse(beamsData)
        requestPermission(
          navigation,
          beamsToken,
          email,
          () => setUserNotifs("Granted"),
          () => setUserNotifs("Blocked")
        )
      } catch (e) {
        console.error("No beamsData in async storage ", e)
      }
    } else {
      setUserNotifs("Denied")
      unsubscribe(seasonsNotifInterest)
    }
  }

  const disabled = userNotificationStatus === "Blocked"
  const selected = userNotificationStatus === "Granted"

  return (
    <Box px={2}>
      <Separator />
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
        <Toggle disabled={disabled || isMutating} onChange={onChange} selected={selected} />
      </Flex>
      <Spacer m={2} />
    </Box>
  )
}
