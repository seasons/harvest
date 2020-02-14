import { Platform } from "react-native"
import Config from "react-native-config"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"
import { requestNotifications } from "react-native-permissions"

// Get your interest
const donutsInterest = "debug-donuts"

// Initialize notifications
export const init = navigation => {
  requestNotifications(["alert", "sound", "badge", "criticalAlert"]).then(({ status }) => {
    if (status === "granted") {
      RNPusherPushNotifications.setInstanceId(Config.RN_PUSHER_ID, navigation)
      navigation.navigate("Home")
    } else {
      navigation.navigate("Home")
    }
  })
  // Set your app key and register for push

  // Init interests after registration
  RNPusherPushNotifications.on("registered", () => {
    subscribe(donutsInterest)
  })

  // Setup notification listeners
  RNPusherPushNotifications.on("notification", handleNotification)
}

// Handle notifications received
const handleNotification = notification => {
  // iOS app specific handling
  if (Platform.OS === "ios") {
    switch (notification.appState) {
      case "inactive":
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
const unsubscribe = interest => {
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
