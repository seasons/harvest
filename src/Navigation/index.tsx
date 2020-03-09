import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from "./AuthProvider"
import { NotificationsProvider } from "App/Notifications"

const getActiveRouteName = state => {
  const route = state.routes[state.index]

  if (route.state) {
    return getActiveRouteName(route.state)
  }

  return route.name
}

export const AppContainer = () => {
  const routeNameRef = React.useRef()
  const navigationRef = React.useRef()
  const [currentScreen, setCurrentScreen] = useState("HomeStack")

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = getActiveRouteName(state)

        if (previousRouteName !== currentRouteName) {
          setCurrentScreen(currentRouteName)
        }

        routeNameRef.current = currentRouteName
      }}
    >
      <NotificationsProvider navigation={navigationRef}>
        <AuthProvider currentScreen={currentScreen} navigationRef={navigationRef} />
      </NotificationsProvider>
    </NavigationContainer>
  )
}
