import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { color, space } from "App/Utils"
import { useComponentSize } from "App/Utils/Hooks/useComponentSize"
import { Text } from "Components/Typography"
import { ActiveDislikedFace, ActiveLovedFace, ActiveNeutralFace, DefaultDislikedFace, DefaultLovedFace, DefaultNeutralFace } from "Assets/svgs"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"

const windowDimensions = Dimensions.get("window")
const windowHeight = windowDimensions.height
const twoButtonWidth = windowDimensions.width / 2 - (space(2) + space(0.5))

export interface PopUpProps {
  insetsBottom?: boolean
  show: boolean
}

export const ReviewPopUp: React.FC<PopUpProps> = ({ show, insetsBottom }) => {
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

  return (
    <>
      <AnimatedPopUp style={{ transform: [{ translateY: animation.translateY }] }} color={color("white100")}>
        <Box m={2} onLayout={onLayout}>
          <Spacer mt={2} />
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" alignItems="center">
            <Sans size="2" color={color("black100")}>
              What'd you think?
            </Sans>
            <Spacer mb={1} />
            <Text style={{ textAlign: "center" }}>
              <Sans size="1" color={color("black50")}>
                Help us improve your experience by sharing what you thought of your last order
              </Sans>
            </Text>
            <Spacer mb={4} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center" alignItems="center">
              <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" alignItems="center">
                <DefaultDislikedFace />
                <Spacer mb={1} />
                <Sans size="0" color={color("black50")}>
                  Disliked
                </Sans>
              </Flex>
              <Spacer ml={5} />
              <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" alignItems="center">
                <DefaultNeutralFace />
                <Spacer mb={1} />
                <Sans size="0" color={color("black50")}>
                  Meh
                </Sans>
              </Flex>
              <Spacer ml={5} />
              <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" alignItems="center">
                <DefaultLovedFace />
                <Spacer mb={1} />
                <Sans size="0" color={color("black50")}>
                  Loved
                </Sans>
              </Flex>
            </Flex>
            <Spacer mb={2} />
          </Flex>
          <Spacer mb={3} />
          <Spacer mb={4} />
        </Box>
      </AnimatedPopUp>
      {show && <AnimatedOuterWrapper style={{ backgroundColor: animation.backgroundColor }} />}
    </>
  )
}

const OuterWrapper = styled(Box)`
  position: absolute;
  flex: 1;
  top: 0;
  bottom: 0;
  right: 0;
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
