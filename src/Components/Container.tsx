import React from "react"
import { StatusBar } from "react-native"
import { Theme } from "./Theme"
import { Flex } from "./Flex"
import { useSafeArea } from "react-native-safe-area-context"
import { color } from "App/Utils"

export const Container: React.FC<{
  children: any
  style?: any
  insetsBottom?: boolean
  insetsTop?: boolean
  backgroundColor?: "black100" | "white100"
}> = ({ children, backgroundColor = "white100", insetsBottom, insetsTop, style }) => {
  const insets = useSafeArea()

  return (
    <Theme>
      <StatusBar backgroundColor={color(backgroundColor)} barStyle="dark-content" />
      <Flex
        style={{
          flex: 1,
          paddingTop: insetsTop ? insets.top : 0,
          paddingBottom: insetsBottom ? insets.bottom : 0,
          backgroundColor: color(backgroundColor),
          ...style,
        }}
      >
        {children}
      </Flex>
    </Theme>
  )
}
