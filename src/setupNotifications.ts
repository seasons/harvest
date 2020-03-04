import { Platform } from "react-native"
import Config from "react-native-config"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"
import { requestNotifications } from "react-native-permissions"

// Get your interest
export const seasonsNotifInterest = "debug-kieran-test"

// Initialize notifications
export const requestPermission = (navigation, beamsToken, email, onAccepted, onDenied) => {
  requestNotifications(["alert", "sound", "badge", "criticalAlert"]).then(({ status }) => {
    if (status === "granted") {
      notificationsInit(email, beamsToken, navigation)
      onAccepted ? onAccepted() : null
    } else {
      onDenied ? onDenied() : null
    }
  })
  // Set your app key and register for push
}

export const notificationsInit = (email, beamsToken, navigation) => {
  RNPusherPushNotifications.setInstanceId(Config.RN_PUSHER_ID)
  // Init interests after registration
  RNPusherPushNotifications.on("registered", () => {
    setUserId(email, beamsToken, setUserIdOnError, setUserIdOnSuccess)
    subscribe(seasonsNotifInterest)
  })

  // Setup notification listeners
  RNPusherPushNotifications.on("notification", notification => {
    handleNotification(notification, navigation)
  })
}

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

// Subscribe to an interest
const subscribe = interest => {
  // Note that only Android devices will respond to success/error callbacks
  RNPusherPushNotifications.subscribe(
    interest,
    (statusCode, response) => {
      console.error(statusCode, response)
    },
    () => {
      console.log("Success")
    }
  )
}

// Unsubscribe from an interest
export const unsubscribe = interest => {
  RNPusherPushNotifications.unsubscribe(
    interest,
    (statusCode, response) => {
      console.log(statusCode, response)
    },
    () => {
      console.log("Success")
    }
  )
}

const setUserId = (userId, token, onError, onSuccess) => {
  if (Platform.OS === "ios") {
    RNPusherPushNotifications.setUserId(userId, token, onError)
  } else {
    RNPusherPushNotifications.setUserId(userId, token, onError, onSuccess)
  }
}

const setUserIdOnError = () => {
  console.log("error setting using ID")
}

const setUserIdOnSuccess = () => {
  console.log("success setting using ID")
}
