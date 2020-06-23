import React from "react"
import { config, Env } from "App/utils/config"
import AsyncStorage from "@react-native-community/async-storage"
import { checkNotifications, requestNotifications } from "react-native-permissions"
import { Platform } from "react-native"
import gql from "graphql-tag"
import NotificationsContext from "./NotificationsContext"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"
import { useQuery } from "react-apollo"
import { useNavigation } from "@react-navigation/native"
import { getUserSession } from "App/utils/auth"

// Get your interest
export const seasonsNotifInterest = "seasons-general-notifications"

export const GET_BEAMS_DATA = gql`
  query BeamsData {
    me {
      user {
        email
        beamsToken
        roles
      }
    }
  }
`

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

export const NotificationsProvider = ({ children }) => {
  const navigation = useNavigation()
  useQuery(GET_BEAMS_DATA, {
    onCompleted: async (data) => {
      const beamsData = await AsyncStorage.getItem("beamsData")
      const userSession = await getUserSession()
      if (!beamsData && userSession && userSession.token) {
        const beamsToken = data?.me?.user?.beamsToken
        const email = data?.me?.user?.email
        const roles = data?.me?.user?.roles
        const beamsData = { beamsToken, email, roles }
        AsyncStorage.setItem("beamsData", JSON.stringify(beamsData))
      }
      notificationsContext.checkStatus()
    },
  })

  const handleNotification = (notification) => {
    const route = notification?.userInfo?.data?.route
    const screen = notification?.userInfo?.data?.screen
    const params = notification?.userInfo?.data?.params
    // iOS app specific handling
    if (Platform.OS === "ios") {
      switch (notification.appState) {
        case "inactive":
          if (route && screen && params) {
            navigation?.navigate(route, { screen, params })
          } else if (route && params) {
            navigation?.navigate(route, params)
          } else if (route) {
            navigation?.navigate(route)
          }
          break
        // inactive: App came in foreground by clicking on notification.
        //           Use notification.userInfo for redirecting to specific view controller
        case "background":
          // background: App is in background and notification is received.
          //             You can fetch required data here don't do anything with UI
          break
        case "active":
          // App is foreground and notification is received. Show a alert or something.
          break
        default:
          break
      }
    } else {
      console.log("android handled notification...")
    }
  }

  const attachListeners = (email, roles, beamsToken) => {
    RNPusherPushNotifications.setInstanceId(config.get(Env.RN_PUSHER_ID))
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
      if (roles?.includes("Admin")) {
        RNPusherPushNotifications.subscribe(
          `debug-${seasonsNotifInterest}`,
          (statusCode, response) => {
            console.error(statusCode, response)
          },
          () => {
            console.log("Success subscribe in attachListeners (debug)")
          }
        )
      }
    })

    // Setup notification listeners
    RNPusherPushNotifications.on("notification", (notification) => {
      handleNotification(notification)
    })
  }

  const notificationsContext = {
    requestPermissions: async (callback) => {
      requestNotifications(["alert", "sound", "badge", "criticalAlert"]).then(async ({ status }) => {
        if (status === "granted") {
          const beamsData = await AsyncStorage.getItem("beamsData")
          if (beamsData) {
            const { beamsToken, email, roles } = JSON.parse(beamsData)
            attachListeners(email, roles, beamsToken)
          }
        }
        callback?.(status)
      })
      // Set your app key and register for push
    },
    checkStatus: async () => {
      checkNotifications()
        .then(async ({ status }) => {
          if (status === "granted") {
            const beamsData = await AsyncStorage.getItem("beamsData")
            if (beamsData) {
              const { beamsToken, roles, email } = JSON.parse(beamsData)
              attachListeners(email, roles, beamsToken)
            }
          }
        })
        .catch((error) => {
          console.log("error checking for permission", error)
        })
    },
    init: async () => {
      const beamsData = await AsyncStorage.getItem("beamsData")
      if (beamsData) {
        const { beamsToken, roles, email } = JSON.parse(beamsData)
        attachListeners(email, roles, beamsToken)
      }
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
      RNPusherPushNotifications.clearAllState()
    },
  }

  return <NotificationsContext.Provider value={notificationsContext}>{children}</NotificationsContext.Provider>
}
