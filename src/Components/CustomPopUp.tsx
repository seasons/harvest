import { Box, Button, Sans, Spacer } from "App/Components"
import { color } from "App/utils"
import { useComponentSize } from "App/utils/hooks/useComponentSize"
import React, { useState, useEffect } from "react"
import { Dimensions, Modal } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"

const windowDimensions = Dimensions.get("window")
const windowHeight = windowDimensions.height

export interface CustomPopUpProps {
  buttonText?: string
  onRequestClose?: () => void
  title?: string
  children: any
  visible: boolean
}

export const CustomPopUp: React.FC<CustomPopUpProps> = ({ buttonText, children, onRequestClose, visible, title }) => {
  // layout
  const insets = useSafeAreaInsets()

  // animation
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!visible && showModal) {
      timeout = setTimeout(() => {
        setShowModal(false)
      }, 400)
    } else if (visible && !showModal) {
      clearTimeout(timeout)
      setShowModal(true)
    }
  }, [visible])

  const [size, onLayout] = useComponentSize()
  const height = size ? size.height : 300

  const animation = useSpring({
    translateY: visible ? windowHeight - height : windowHeight,
    backgroundColor: visible ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
  })

  // render
  return (
    <Modal transparent visible={showModal}>
      <AnimatedPopUp style={{ transform: [{ translateY: animation.translateY }] }} color={color("white100")}>
        <Box p={2} pt={4} pb={insets.bottom + 16} onLayout={onLayout}>
          {title && (
            <Sans color={color("black100")} size="3">
              {title}
            </Sans>
          )}
          <Spacer mb={1} />
          {children}
          <Spacer mb={1} />
          {!!buttonText && (
            <Button block variant="primaryBlack" onPress={onRequestClose}>
              {buttonText}
            </Button>
          )}
        </Box>
      </AnimatedPopUp>
      <AnimatedOverlay style={{ backgroundColor: animation.backgroundColor }} />
    </Modal>
  )
}

const Overlay = styled(Box)`
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
  background-color: ${(p) => p.color};
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 100;
`

const AnimatedPopUp = animated(Container)
const AnimatedOverlay = animated(Overlay)
