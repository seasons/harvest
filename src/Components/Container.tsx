import React from "react"
import { Theme } from "./Theme"
import { View } from "react-native"

export const Container = ({ children }) => {
  return (
    <Theme>
      <View style={{ flex: 1 }}>{children}</View>
    </Theme>
  )
}
