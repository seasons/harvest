import { Box, Theme } from "App/Components"
import { color } from "App/utils"
import { useComponentSize } from "App/utils/hooks/useComponentSize"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"

const windowDimensions = Dimensions.get("window")
const windowHeight = windowDimensions.height

export const PopUp: React.FC<{ show: boolean; theme?: "dark" | "light" }> = ({ children, show, theme }) => {
  const [mounted, setMounted] = useState(false)
  const insets = useSafeAreaInsets()
  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    })
  }, [setMounted])

  const [size, onLayout] = useComponentSize()

  const height = size ? size.height : 240

  const animation = useSpring({
    translateY: show && mounted ? windowHeight - height : windowHeight,
    backgroundColor: show && mounted ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  })

  const colorsForTheme = (theme) => {
    switch (theme) {
      case "dark":
        return {
          backgroundColor: color("green"),
          primaryText: color("white100"),
          secondaryText: color("lightGreen"),
          separator: color("lightGreen"),
        }
      case "light":
        return {
          backgroundColor: color("white100"),
          primaryText: color("black100"),
          secondaryText: color("black50"),
          separator: "transparent",
        }
    }
  }

  const colors = colorsForTheme(theme ? theme : "light")

  return (
    <Theme>
      <AnimatedPopUp
        style={{ transform: [{ translateY: animation.translateY }] }}
        color={colors?.backgroundColor || color("white100")}
      >
        <Box pb={insets.bottom} onLayout={onLayout}>
          {children}
        </Box>
      </AnimatedPopUp>
      <AnimatedOverlay style={{ backgroundColor: animation.backgroundColor, display: show ? "flex" : "none" }} />
    </Theme>
  )
}

const Overlay = styled(Box)`
  position: absolute;
  flex: 1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 4000;
`

const Container = styled(Box)<{ color: string }>`
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  background-color: ${(p) => p.color};
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 4001;
`

const AnimatedPopUp = animated(Container)
const AnimatedOverlay = animated(Overlay)
