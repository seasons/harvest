import { Box, Button, Flex, Sans, Separator, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
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
  reservationFeedback: any
}

export const ReviewPopUp: React.FC<PopUpProps> = ({ reservationFeedback, show }) => {
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

  const images = reservationFeedback.feedbacks.map(feedback => feedback.variant.images[0].url)
  const options = ["Loved it", "It was ok", "Didn't like it"]
  const buttonWidth = windowDimensions.width - 32

  return (
    <>
      <AnimatedPopUp style={{ transform: [{ translateY: animation.translateY }] }} color={color("white100")}>
        <Box p={2} onLayout={onLayout}>
          <Spacer mt={4} />
          <Flex flexDirection="column" flexWrap="nowrap" justifyContent="center" >
            <Sans size="2" color={color("black100")}>
              What'd you think?
            </Sans>
            <Spacer mb={1} />
            <Sans size="1" color={color("black50")}>
              Help us improve your experience by sharing what you thought of your last order
              </Sans>
            <Spacer mb={3} />
            <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center" alignItems="center">
              {images.map(image => (
                <>
                  <FadeInImage source={{ uri: image }} style={{ width: 112, height: 140 }} />
                  <Spacer ml={0.5} />
                </>
              ))}
            </Flex>
            <Spacer mb={3} />
            <Separator />
            <Spacer mb={3} />
            {options.map(option => (
              <>
                <Button variant="secondaryWhite" width={buttonWidth} height={48}>{option}</Button>
                <Spacer mt={1} />
              </>
            ))}
            <Spacer mb={6} />
          </Flex>
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
