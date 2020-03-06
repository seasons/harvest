import React, { useState, useEffect } from "react"
import { Separator, Spacer, Flex, Box, Toggle, Sans } from "App/Components"
import { color } from "App/Utils"
import { unsubscribe, requestPermission, seasonsNotifInterest } from "App/setupNotifications"
import AsyncStorage from "@react-native-community/async-storage"
import { useMutation } from "react-apollo"
import { Text, Linking, AppState } from "react-native"
import { GET_USER } from "../Account"
import { useNavigation } from "@react-navigation/native"
import { UPDATE_USER_PUSH_NOTIFICATIONS } from "App/Scenes/SignIn/AllowNotifications"
import { PushNotificationStatus } from "App/generated/globalTypes"
import { checkNotifications } from "react-native-permissions"

export const NotificationToggle: React.FC<{ userNotificationStatus: PushNotificationStatus; userID: string }> = ({
  userNotificationStatus,
  userID,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const navigation = useNavigation()
  const [updateUserPushNotifications] = useMutation(UPDATE_USER_PUSH_NOTIFICATIONS, {
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: () => {
      setIsMutating(false)
    },
  })

  const handleRequestNotifications = async () => {
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
  }

  useEffect(() => {
    // If user leaves the app to turn on notifications in the settings recheck status
    const unsubscribe = AppState.addEventListener("change", userNotificationStatus => {
      checkNotifications()
        .then(async ({ status }) => {
          if (userNotificationStatus && status !== userNotificationStatus?.toLowerCase()) {
            handleRequestNotifications()
          }
        })
        .catch(error => {
          console.log("error checking for permission", error)
        })
    })
    return unsubscribe
  }, [navigation])

  const setUserNotifs = async status => {
    console.log("userID", userID)
    await updateUserPushNotifications({
      variables: {
        pushNotificationsStatus: status,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateUserPushNotifications: {
          __typename: "User",
          pushNotifications: status,
        },
      },
    })
  }

  const onChange = async () => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    if (userNotificationStatus === "Denied") {
      handleRequestNotifications()
    } else {
      setUserNotifs("Denied")
      unsubscribe(seasonsNotifInterest)
    }
  }

  const disabled = userNotificationStatus === "Blocked"
  const selected = userNotificationStatus === "Granted"

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
        <Toggle disabled={disabled || isMutating} onChange={onChange} selected={selected} />
      </Flex>
      <Spacer m={2} />
    </Box>
  )
}
