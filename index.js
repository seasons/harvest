import { App } from "./src/App"
import { AppRegistry } from "react-native"
import * as Sentry from "@sentry/react-native"
import "react-native-gesture-handler"

// https://github.com/facebook/react-native/issues/25701#issuecomment-513450639
global.Blob = null

if (!__DEV__) {
  Sentry.init({
    dsn: "https://6e163b9f771f4c53951c546a4ac64891@sentry.io/1824125",
  })
}

AppRegistry.registerComponent("seasons", () => App)
