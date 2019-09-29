import React, { useState, useEffect } from "react"
import styled from "styled-components/native"
import { TouchableWithoutFeedback } from "react-native"
import { Sans, Box, Spacer, Separator } from "./"
import { color } from "../helpers"
import { animated, Spring } from "react-spring/renderprops-native.cjs"

export interface Props {
  title: string
  note?: string
  show: boolean
  buttonText: string
  onClose: () => void
}

export const ErrorPopUp = ({ title, note, show, buttonText, onClose }) => {
  const [outerWrapperAnimation, setOuterWrapperAnimation] = useState({
    backgroundColor: "rgba(0, 0, 0, 0)",
  })

  const [popUpAnimation, setPopUpAnimation] = useState({
    height: 0,
  })

  useEffect(() => {
    if (show) {
      setOuterWrapperAnimation({ backgroundColor: "rgba(0, 0, 0, 0.5)" })
      setPopUpAnimation({ height: "auto" })
    } else {
      setOuterWrapperAnimation({ backgroundColor: "rgba(0, 0, 0, 0)" })
      setPopUpAnimation({ height: 0 })
    }
  }, [show])

  return (
    <AnimatedOuterWrapper style={{ outerWrapperAnimation }}>
      <AnimatedPopUp style={{ popUpAnimation }}>
        <Box m={2}>
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
    </AnimatedOuterWrapper>
  )
}

const OuterWrapper = styled(Box)`
  position: absolute;
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  bottom: 0;
  left: 0;
`

const PopUp = styled(Box)`
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  background-color: ${color("green")};
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
`

const AnimatedPopUp = animated(PopUp)

const AnimatedOuterWrapper = animated(OuterWrapper)
