import { Platform } from "react-native"
import Config from "react-native-config"
import RNPusherPushNotifications from "react-native-pusher-push-notifications"

// Get your interest
const donutsInterest = "debug-donuts"

// Initialize notifications
export const init = navigation => {
  // Set your app key and register for push
  RNPusherPushNotifications.setInstanceId(Config.RN_PUSHER_ID, navigation)

  // Init interests after registration
  RNPusherPushNotifications.on("registered", () => {
    console.log("registered!!")
    navigation.navigate("Home")
    subscribe(donutsInterest)
  })

  // Setup notification listeners
  RNPusherPushNotifications.on("notification", handleNotification)
}

// Handle notifications received
const handleNotification = notification => {
  console.log("notification", notification)

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
