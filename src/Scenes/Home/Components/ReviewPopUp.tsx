import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { color, space } from "App/utils"
import { useComponentSize } from "App/utils/hooks/useComponentSize"
import { Text } from "Components/Typography"
import { ActiveDislikedFace, ActiveLovedFace, ActiveNeutralFace, DefaultDislikedFace, DefaultLovedFace, DefaultNeutralFace } from "Assets/svgs"
import React, { useEffect, useState } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"

const windowDimensions = Dimensions.get("window")
const windowHeight = windowDimensions.height

export interface PopUpProps {
  show: boolean
}

export const ReviewPopUp: React.FC<PopUpProps> = ({ show }) => {
  const [mounted, setMounted] = useState(false)
  const [isDislikeSelected, setIsDislikeSelected] = useState(false)
  const [isNeutralSelected, setIsNeutralSelected] = useState(false)
  const [isLovedSelected, setIsLovedSelected] = useState(false)
  const [size, onLayout] = useComponentSize()
  const height = size ? size.height + 100 : 240

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    })
  }, [])

  const animation = useSpring({
    translateY: show && mounted ? windowHeight - height : windowHeight,
    backgroundColor: show && mounted ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  })

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
                <TouchableOpacity onPress={() => setIsDislikeSelected(true)}>
                  {isDislikeSelected ? <ActiveDislikedFace /> : <DefaultDislikedFace />}
                </TouchableOpacity>
                <Spacer mb={1} />
                <Sans size="0" color={color("black50")}>
                  Disliked
                </Sans>
              </Flex>
              <Spacer ml={5} />
              <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" alignItems="center">
                <TouchableOpacity onPress={() => setIsNeutralSelected(true)}>
                  {isNeutralSelected ? <ActiveNeutralFace /> : <DefaultNeutralFace />}
                </TouchableOpacity>
                <Spacer mb={1} />
                <Sans size="0" color={color("black50")}>
                  Meh
                </Sans>
              </Flex>
              <Spacer ml={5} />
              <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" alignItems="center">
                <TouchableOpacity onPress={() => setIsLovedSelected(true)}>
                  {isLovedSelected ? <ActiveLovedFace /> : <DefaultLovedFace />}
                </TouchableOpacity>
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
