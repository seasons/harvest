import React from "react"
import { StatusBar } from "react-native"
import { Theme } from "./Theme"
import { Flex } from "./Flex"
import { useSafeArea } from "react-native-safe-area-context"
import { color } from "App/Utils"

export const Container: React.FC<{ children: any; backgroundColor?: "black100" | "white100" }> = ({
  children,
  backgroundColor = "white100",
}) => {
  const insets = useSafeArea()

  return (
    <Theme>
      <StatusBar backgroundColor={color(backgroundColor)} barStyle="dark-content" />
      <Flex
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: color(backgroundColor),
        }}
      >
        {children}
      </Flex>
    </Theme>
  )
}
