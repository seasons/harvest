import { Platform } from "react-native"
import Config from "react-native-config"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"
import { requestNotifications } from "react-native-permissions"

// Get your interest
const debugBag = "debug-kieran-test"

// Initialize notifications
export const requestPermission = (navigation, beamsToken, email) => {
  console.log("email2", email, "beamsToken2", beamsToken)
  requestNotifications(["alert", "sound", "badge", "criticalAlert"]).then(({ status }) => {
    if (status === "granted") {
      notificationsInit()
      setUserId(email, beamsToken, setUserIdOnError, setUserIdOnSuccess)
    }
    navigation ? navigation.navigate("Main") : null
  })
  // Set your app key and register for push
}

export const notificationsInit = () => {
  console.log("Config.RN_PUSHER_ID", Config.RN_PUSHER_ID)
  RNPusherPushNotifications.setInstanceId(Config.RN_PUSHER_ID)
  // Init interests after registration
  RNPusherPushNotifications.on("registered", () => {
    subscribe(debugBag)
  })

  // Setup notification listeners
  RNPusherPushNotifications.on("notification", handleNotification)
}

// Handle notifications received
const handleNotification = (notification, navigation) => {
  // iOS app specific handling
  if (Platform.OS === "ios") {
    switch (notification.appState) {
      case "inactive":
        navigation.navigate("Main")
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
  console.log("subscribe", interest)
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
  console.log("userID", userId)
  console.log("token", token)
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
