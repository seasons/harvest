import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import { color, space } from "App/Utils"
import { useComponentSize } from "App/Utils/Hooks/useComponentSize"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { Button } from "./Button"

const windowDimensions = Dimensions.get("window")
const windowHeight = windowDimensions.height
const twoButtonWidth = windowDimensions.width / 2 - (space(2) + space(0.5))

export interface PopUpData {
  title?: string
  icon?: JSX.Element
  note?: string
  buttonText?: string
  onClose: any
  theme?: "light" | "dark"
  secondaryButtonText?: string
  secondaryButtonOnPress?: () => void
}

export interface PopUpProps {
  insetsBottom?: boolean
  show: boolean
  data?: PopUpData
}

export const PopUp: React.FC<PopUpProps> = ({ data, show, insetsBottom }) => {
  if (!data) {
    return <></>
  }
  const { icon, buttonText, onClose, theme = "light", title, note, secondaryButtonText, secondaryButtonOnPress } = data
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

  if (!(title && note && buttonText)) {
    return <></>
  }

  const colors = colorsForTheme(theme)
  const showSecondaryButton = !!secondaryButtonText && !!secondaryButtonOnPress

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
                <Spacer mb={0.5} />
                <Sans size="1" color={colors.secondaryText} textAlign="center">
                  {note}
                </Sans>
              </>
            )}
          </Box>
          <Spacer mb={3} />
          <Separator color={colors.separator} />
          <Flex flexDirection="row">
            {showSecondaryButton && (
              <>
                <Button width={twoButtonWidth} variant="primaryWhite" onPress={secondaryButtonOnPress}>
                  {secondaryButtonText}
                </Button>
                <Spacer mr={1} />
              </>
            )}
            <Button
              width={showSecondaryButton ? twoButtonWidth : null}
              variant="primaryBlack"
              block={!showSecondaryButton}
              onPress={() => onClose?.()}
            >
              {buttonText}
            </Button>
          </Flex>
          <Spacer mb={insetsBottom ? 6 : 2} />
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
