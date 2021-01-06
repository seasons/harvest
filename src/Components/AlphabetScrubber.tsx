import { color } from "App/utils/color"
import { Schema, useTracking } from "App/utils/track"
import React, { useRef, useState } from "react"
import { PanResponder } from "react-native"
import styled from "styled-components/native"
import { Box } from "./Box"
import { Flex } from "./Flex"
import { Sans } from "./Typography"

export const AlphabetScrubber = ({ alphabet, scrollTo }) => {
  const tracking = useTracking()
  const alphabetContainer = useRef(null)
  const [containerSize, setContainerSize] = useState({ containerTop: null, containerHeight: null })

  const handleOnLayout = () => {
    alphabetContainer?.current?.measure((width, x1, y1, height, px, py) => {
      if (!containerSize.containerTop && !containerSize.containerHeight) {
        setContainerSize({ containerTop: py, containerHeight: height })
      }
    })
  }

  const handleOnFingerTouch = (e, gestureState) => {
    const letter = getTouchedLetter(gestureState.y0)
    handleOnTouchLetter(letter)
    tracking.trackEvent({
      actionName: Schema.ActionNames.AlphabetTapped,
      actionType: Schema.ActionTypes.Tap,
      letter,
    })
  }

  const getTouchedLetter = (y) => {
    const top = y - (containerSize.containerTop || 0) - 5

    if (top >= 1 && top <= containerSize.containerHeight) {
      return alphabet[Math.round((top / containerSize.containerHeight) * alphabet.length)]
    }
  }

  const handleOnFingerMove = (evt, gestureState) => {
    handleOnTouchLetter(getTouchedLetter(gestureState.moveY))
  }

  const handleOnTouchLetter = (touchedLetter) => {
    scrollTo(touchedLetter)
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => handleOnFingerTouch(evt, gestureState),
    onPanResponderMove: (evt, gestureState) => handleOnFingerMove(evt, gestureState),
  })

  return (
    <Scrubber>
      <Flex flexDirection="column" style={{ flex: 1 }} justifyContent="center">
        <Box py={2} pr={2} pl={3} {...panResponder?.panHandlers} onLayout={handleOnLayout} ref={alphabetContainer}>
          {alphabet.map((letter) => (
            <Box key={letter}>
              <Box>
                <Sans color={color("black50")} size="0">
                  {letter}
                </Sans>
              </Box>
            </Box>
          ))}
        </Box>
      </Flex>
    </Scrubber>
  )
}

const Scrubber = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
`
