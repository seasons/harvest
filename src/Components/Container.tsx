import { color } from "App/utils"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Flex } from "./Flex"
import { Theme } from "./Theme"

export const Container: React.FC<{
  children: any
  style?: any
  insetsBottom?: boolean
  insetsTop?: boolean
  backgroundColor?: "black100" | "white100"
}> = ({ children, backgroundColor = "white100", insetsBottom = true, insetsTop = true, style }) => {
  const insets = useSafeAreaInsets()

  return (
    <Theme>
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
