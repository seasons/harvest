import App from "./src"
import { AppRegistry } from "react-native"
import * as Sentry from "@sentry/react-native"
import "react-native-gesture-handler"
// "core-js/features/promise" is a polyfill Apollo refetch in RN, see: https://github.com/apollographql/apollo-client/issues/6381
import "core-js/features/promise"

AppRegistry.registerComponent("seasons", () => App)
