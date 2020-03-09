import React, { useEffect, useReducer } from "react"
import Config from "react-native-config"
import AsyncStorage from "@react-native-community/async-storage"
import { checkNotifications, requestNotifications } from "react-native-permissions"
import { Platform } from "react-native"
import gql from "graphql-tag"
import NotificationsContext from "./NotificationsContext"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"
import { useMutation } from "react-apollo"
import { GET_USER } from "App/Scenes/Account/Account"

// Get your interest
export const seasonsNotifInterest = "debug-seasons-general-notifications"

export const UPDATE_USER_PUSH_NOTIFICATIONS = gql`
  mutation UpdateUserPushNotifications($pushNotificationsStatus: String!) {
    updateUserPushNotifications(pushNotificationsStatus: $pushNotificationsStatus) {
      pushNotifications
    }
  }
`

// Handle notifications received
const handleNotification = (notification, navigation) => {
  const route = notification?.userInfo?.data?.route
  const screen = notification?.userInfo?.data?.screen
  const params = notification?.userInfo?.data?.params
  // iOS app specific handling
  if (Platform.OS === "ios") {
    switch (notification.appState) {
      case "inactive":
        if (route && screen && params) {
          navigation.navigate(route, { screen, params })
        } else if (route && params) {
          navigation.navigate(route, params)
        } else if (route) {
          navigation.navigate(route)
        }
      // inactive: App came in foreground by clicking on notification.
      //           Use notification.userInfo for redirecting to specific view controller
      case "background":
      // background: App is in background and notification is received.
      //             You can fetch required data here don't do anything with UI
      case "active":
      // App is foreground and notification is received. Show a alert or something.
      default:
        break
    }
  } else {
    console.log("android handled notification...")
  }
}

const setUserId = (userId, token) => {
  const setUserIdOnError = () => {
    console.log("error setting using ID")
  }

  const setUserIdOnSuccess = () => {
    console.log("success setting using ID")
  }

  if (Platform.OS === "ios") {
    RNPusherPushNotifications.setUserId(userId, token, setUserIdOnError)
  } else {
    RNPusherPushNotifications.setUserId(userId, token, setUserIdOnError, setUserIdOnSuccess)
  }
}

export const NotificationsProvider = ({ children, navigation }) => {
  const [updateUserPushNotifications] = useMutation(UPDATE_USER_PUSH_NOTIFICATIONS, {
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  })
  const [notificationState, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SUBSCRIBE":
          return {
            ...prevState,
            subscribedToNotifs: true,
          }
        case "UNSUBSCRIBE":
          return {
            ...prevState,
            subscribedToNotifs: false,
          }
      }
    },
    {
      subscribedToNotifs: null,
    }
  )

  const attachListeners = (email, beamsToken) => {
    RNPusherPushNotifications.setInstanceId(Config.RN_PUSHER_ID)
    // Init interests after registration
    RNPusherPushNotifications.on("registered", () => {
      setUserId(email, beamsToken)
      RNPusherPushNotifications.subscribe(
        seasonsNotifInterest,
        (statusCode, response) => {
          console.error(statusCode, response)
        },
        () => {
          console.log("Success subscribe in attachListeners")
        }
      )
    })

    AsyncStorage.setItem("subscribedToNotifs", "true")
    dispatch({ type: "SUBSCRIBE" })

    // Setup notification listeners
    RNPusherPushNotifications.on("notification", notification => {
      handleNotification(notification, navigation)
    })
  }

  useEffect(() => {
    notificationsContext.checkStatus()
  }, [])

  const notificationsContext = {
    requestPermissions: async callback => {
      requestNotifications(["alert", "sound", "badge", "criticalAlert"]).then(async ({ status }) => {
        if (status === "granted") {
          const beamsData = await AsyncStorage.getItem("beamsData")
          if (beamsData) {
            const { beamsToken, email } = JSON.parse(beamsData)
            attachListeners(email, beamsToken)
            notificationsContext.setDeviceNotifStatus("Granted")
          }
        } else {
          notificationsContext.setDeviceNotifStatus("Blocked")
        }
        callback?.()
      })
      // Set your app key and register for push
    },
    checkStatus: async () => {
      const subscription = await AsyncStorage.getItem("subscribedToNotifs")
      if (subscription && subscription === "true") {
        const beamsData = await AsyncStorage.getItem("beamsData")
        if (beamsData) {
          const { beamsToken, email } = JSON.parse(beamsData)
          attachListeners(email, beamsToken)
        }
      } else if (subscription && subscription === "false") {
        return
      } else {
        checkNotifications()
          .then(async ({ status }) => {
            if (status === "granted") {
              const beamsData = await AsyncStorage.getItem("beamsData")
              if (beamsData) {
                const { beamsToken, email } = JSON.parse(beamsData)
                attachListeners(email, beamsToken)
              }
            }
          })
          .catch(error => {
            console.log("error checking for permission", error)
          })
      }
    },
    init: async () => {
      const beamsData = await AsyncStorage.getItem("beamsData")
      if (beamsData) {
        const { beamsToken, email } = JSON.parse(beamsData)
        attachListeners(email, beamsToken)
      }
    },
    setDeviceNotifStatus: async status => {
      await updateUserPushNotifications({
        variables: {
          pushNotificationsStatus: status,
        },
      })
    },
    unsubscribe: async () => {
      RNPusherPushNotifications.unsubscribe(
        seasonsNotifInterest,
        (statusCode, response) => {
          console.log(statusCode, response)
        },
        () => {
          console.log("unsubscribe Success")
        }
      )
      AsyncStorage.setItem("subscribedToNotifs", "false")
      dispatch({ type: "UNSUBSCRIBE" })
    },
    subscribedToNotifs: notificationState.subscribedToNotifs,
  }

  return <NotificationsContext.Provider value={notificationsContext}>{children}</NotificationsContext.Provider>
}
