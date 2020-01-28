import { App } from "./src/App"
import { AppRegistry } from "react-native"
import * as Sentry from "@sentry/react-native"
import "react-native-gesture-handler"

////////////////// FIXME: This can be removed once react native debugger fixes network requests
////////////////// https://github.com/jhen0409/react-native-debugger/issues/382#issuecomment-544226529
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
global.FormData = global.originalFormData || global.FormData

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false
} else {
  global.Blob = global.originalBlob || global.Blob
  global.FileReader = global.originalFileReader || global.FileReader
}
///////////////////

// https://github.com/facebook/react-native/issues/25701#issuecomment-513450639
// global.Blob = null

if (!__DEV__) {
  Sentry.init({
    dsn: "https://6e163b9f771f4c53951c546a4ac64891@sentry.io/1824125",
  })
}

AppRegistry.registerComponent("seasons", () => App)
