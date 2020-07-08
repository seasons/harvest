import { App } from "./src/App"
import { AppRegistry } from "react-native"
import * as Sentry from "@sentry/react-native"
import "react-native-gesture-handler"
import 'expo-asset'
// import { enableScreens } from "react-native-screens"

// This enables the native stack navigator using (react-native-screens)
// https://reactnavigation.org/blog/2020/02/06/react-navigation-5.0/#native-stack-navigator
// Leaving it commented out for now because there's glitch when navigating to the Product view
// enableScreens()

// TODO: 
console.ignoredYellowBox = ['useNativeDriver'];

AppRegistry.registerComponent("seasons", () => App)
