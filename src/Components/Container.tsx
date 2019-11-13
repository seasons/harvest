import React from "react"
import { StatusBar, View } from "react-native"

import { Theme } from "./Theme"

export const Container = ({ children }) => {
  return (
    <Theme>
      <StatusBar backgroundColor="transparent" barStyle="default" />
      <View style={{ flex: 1 }}>{children}</View>
    </Theme>
  )
}
