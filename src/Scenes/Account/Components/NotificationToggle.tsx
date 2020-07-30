import React, { useState, useEffect } from "react"
import { Spacer, Flex, Box, Toggle, Sans } from "App/Components"
import { color } from "App/utils"
import gql from "graphql-tag"
import { Text, Linking, AppState } from "react-native"
import { checkNotifications } from "react-native-permissions"
import { useNotificationsContext } from "App/Notifications/NotificationsContext"
import { useTracking, Schema } from "App/utils/track"
import { useMutation } from "react-apollo"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import * as Sentry from "@sentry/react-native"
import { GetUser_me_customer_user_pushNotification } from "App/generated/getUser"

const UPDATE_USER_PUSH_NOTIFICATION_STATUS = gql`
  mutation updateUserPushNotificationStatus($newStatus: Boolean!) {
    updateUserPushNotificationStatus(newStatus: $newStatus) {
      id
      status
    }
  }
`

export const NotificationToggle: React.FC<{ pushNotification: GetUser_me_customer_user_pushNotification }> = ({
  pushNotification,
}) => {
  const { requestPermissions, unsubscribe, init } = useNotificationsContext()
  const [isMutating, setIsMutating] = useState(false)
  const [deviceStatus, setDeviceStatus] = useState(null)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const tracking = useTracking()

  const [updateStatus] = useMutation(UPDATE_USER_PUSH_NOTIFICATION_STATUS, {
    onCompleted: (data) => {
      const status = data?.updateUserPushNotificationStatus?.status
      if (status) {
        init()
      } else {
        unsubscribe()
      }
      setIsMutating(false)
    },
    onError: (err) => {
      const popUpData = {
        title: "Oops!",
        note: "There was an error updating your push notifications. Please contact us.",
        buttonText: "Close",
        onClose: () => hidePopUp(),
      }
      console.log("err", err)
      Sentry.captureException(err)
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const checkPermissions = () => {
    checkNotifications()
      .then(async ({ status }) => {
        if (!!status) {
          setDeviceStatus(status)
        }
      })
      .catch((error) => {
        console.log("error checking for permission", error)
      })
  }

  useEffect(() => {
    checkPermissions()
    // If user leaves the app to turn on notifications in the settings recheck status
    const appChangeListener = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkPermissions()
      }
    })
    return appChangeListener
  }, [])

  const callback = (status) => {
    setDeviceStatus(status)
  }

  const onChange = async (newValue) => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    tracking.trackEvent({
      actionName: Schema.ActionNames.NotificationToggleTapped,
      actionType: Schema.ActionTypes.Tap,
      newValue,
    })
    if (deviceStatus === "denied") {
      requestPermissions(callback)
    } else {
      updateStatus({
        variables: { newStatus: newValue },
        optimisticResponse: {
          __typename: "Mutation",
          updateUserPushNotificationStatus: {
            __typename: "UserPushNotification",
            id: pushNotification.id,
            status: newValue,
          },
        },
      })
    }

    setIsMutating(false)
  }

  const TextContent = () => {
    if (deviceStatus === "blocked") {
      return (
        <Sans size="1" color={color("black50")}>
          Enable push notifications in your{" "}
          <Text
            onPress={() => Linking.openSettings()}
            style={{ color: color("black100"), textDecorationLine: "underline" }}
          >
            device settings
          </Text>
          .
        </Sans>
      )
    } else {
      return (
        <Sans size="1" color={color("black50")}>
          Send me push notifications
        </Sans>
      )
    }
  }

  const disabled = isMutating || deviceStatus === "blocked"
  const selected = deviceStatus !== "blocked" && deviceStatus !== "denied" && pushNotification?.status

  return (
    <Box px={2}>
      <Spacer m={2} />
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box style={{ maxWidth: 300 }}>
          <Sans size="2">Order updates</Sans>
          <TextContent />
        </Box>
        <Toggle disabled={disabled} onChange={(newValue) => onChange(newValue)} selected={selected} />
      </Flex>
      <Spacer m={2} />
    </Box>
  )
}
