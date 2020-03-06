import React, { useState } from "react"
import { Sans, Flex, Spacer, Button, Container } from "App/Components"
import { NotificationGraphic } from "Assets/svgs"
import { requestPermission } from "../../setupNotifications"
import { color } from "App/Utils"
import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { GET_USER } from "../Account/Account"

export const UPDATE_USER_PUSH_NOTIFICATIONS = gql`
  mutation UpdateUserPushNotifications($pushNotificationsStatus: String!) {
    updateUserPushNotifications(pushNotificationsStatus: $pushNotificationsStatus) {
      pushNotifications
    }
  }
`

export const AllowNotifications = ({ navigation, route }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [updateUserPushNotifications] = useMutation(UPDATE_USER_PUSH_NOTIFICATIONS, {
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  })

  const beamsToken = route?.params?.beamsToken
  const email = route?.params?.email

  const setUserNotifs = async status => {
    await updateUserPushNotifications({
      variables: {
        pushNotificationsStatus: status,
      },
    })
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
              requestPermission(
                navigation,
                beamsToken,
                email,
                () => setUserNotifs("Granted"),
                () => setUserNotifs("Blocked")
              )
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
            if (isMutating) {
              return
            } else {
              setIsMutating(true)
              setUserNotifs("Denied")
            }
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
