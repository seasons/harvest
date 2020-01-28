import { color } from "App/Utils"
import { useComponentSize } from "App/Utils/Hooks/useComponentSize"
import React, { useRef, useEffect, useState } from "react"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { Box, Sans, Separator, Spacer } from "App/Components"
import { Button } from "./Button"
import { Dimensions } from "react-native"

const windowHeight = Dimensions.get("window").height

export interface Props {
  title?: string
  icon?: JSX.Element
  note?: string
  show: boolean
  buttonText?: string
  onClose: () => void
  theme: "light" | "dark"
}

export const PopUp: React.FC<Props> = ({ title, note, show, icon, buttonText, onClose, theme = "light" }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    })
  }, [])
  const [size, onLayout] = useComponentSize()

  const height = size ? size.height + 100 : 240

  const animation = useSpring({
    translateY: show && mounted ? windowHeight - height : windowHeight,
    backgroundColor: show && mounted ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  })

  const colorsForTheme = theme => {
    switch (theme) {
      case "dark":
        return {
          backgroundColor: color("green"),
          primaryText: color("white"),
          secondaryText: color("lightGreen"),
          separator: color("lightGreen"),
        }
      case "light":
        return {
          backgroundColor: color("white"),
          primaryText: color("black"),
          secondaryText: color("gray"),
          separator: "transparent",
        }
    }
  }

  if (!(title && note && buttonText)) {
    return null
  }

  const colors = colorsForTheme(theme)

  return (
    <>
      <AnimatedPopUp style={{ transform: [{ translateY: animation.translateY }] }} color={colors.backgroundColor}>
        <Box m={2} onLayout={onLayout}>
          {!!icon && (
            <Box mt={2} mx="auto">
              {icon}
            </Box>
          )}
          <Spacer mt={2} />
          <Box>
            <Sans size="2" color={colors.primaryText} textAlign="center">
              {title}
            </Sans>
            {note && (
              <>
                <Spacer mb={2} />
                <Sans size="2" color={colors.secondaryText} textAlign="center">
                  {note}
                </Sans>
              </>
            )}
          </Box>
          <Spacer mb={2} />
          <Separator color={colors.separator} />
          <Button variant="secondaryDark" onPress={() => onClose()}>
            {buttonText}
          </Button>
          <Spacer mb={2} />
        </Box>
      </AnimatedPopUp>
      {show && <AnimatedOuterWrapper style={{ backgroundColor: animation.backgroundColor }} />}
    </>
  )
}

const OuterWrapper = styled(Box)`
  position: absolute;
  flex: 1;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
`

const Container = styled(Box)`
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  background-color: ${p => p.color};
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 100;
`

const AnimatedPopUp = animated(Container)

const AnimatedOuterWrapper = animated(OuterWrapper)
