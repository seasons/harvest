import React from "react"
import { Theme } from "./Theme"
import { useSafeArea } from "react-native-safe-area-context"
import { View } from "react-native"

export const Container = ({ children }) => {
  // const screenHeight = Math.round(Dimensions.get("window").height)
  const insets = useSafeArea()

  return (
    <Theme>
      <View style={{ flex: 1, marginTop: insets.top }}>{children}</View>
    </Theme>
  )
}
