import React from "react"
import styled from "styled-components/native"
import { TouchableWithoutFeedback } from "react-native"
import { Sans, Box, Spacer, Separator } from "./"
import { color } from "App/Utils"
import { animated, useSpring } from "react-spring/native.cjs"
import { useComponentSize } from "App/Utils/Hooks/useComponentSize"

export interface Props {
  title: string
  note?: string
  show: boolean
  buttonText: string
  onClose: () => void
}

export const ErrorPopUp: React.FC<Props> = ({ title, note, show, buttonText, onClose }) => {
  const [size, onLayout] = useComponentSize()
  const height = size ? size.height + 40 : 400

  const popUpAnimation = useSpring({
    bottom: show ? 0 : -height,
  })

  const outerWrapperAnimation = useSpring({
    backgroundColor: show ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
  })

  return (
    <>
      <AnimatedPopUp style={popUpAnimation} height={height}>
        <Box m={2} onLayout={onLayout}>
          <Spacer mt={2} />
          <Box>
            <Sans size="2" color={color("white")}>
              {title}
            </Sans>
            {note && (
              <>
                <Spacer mb={2} />
                <Sans size="2" color={color("lightGreen")}>
                  {note}
                </Sans>
              </>
            )}
          </Box>
          <Spacer mb={2} />
          <Separator color={color("lightGreen")} />
          <Spacer mb={2} />
          <TouchableWithoutFeedback onPress={() => onClose()}>
            <Box>
              <Sans textAlign="center" size="2" color={color("white")}>
                {buttonText}
              </Sans>
              <Spacer mt={4} />
            </Box>
          </TouchableWithoutFeedback>
        </Box>
      </AnimatedPopUp>
      {show && <AnimatedOuterWrapper style={outerWrapperAnimation} />}
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

const PopUp = styled(Box)`
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  background-color: ${color("green")};
  position: absolute;
  width: 100%;
  bottom: -${p => p.height};
  left: 0;
  overflow: hidden;
  z-index: 100;
`

const AnimatedPopUp = animated(PopUp)

const AnimatedOuterWrapper = animated(OuterWrapper)
