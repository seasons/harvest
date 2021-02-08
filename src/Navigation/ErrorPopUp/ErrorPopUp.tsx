import { Box, Flex, Sans, Separator, Spacer, Button, Theme } from "App/Components"
import { color, space } from "App/utils"
import { useComponentSize } from "App/utils/hooks/useComponentSize"
import React, { useEffect, useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView } from "react-native"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useKeyboard } from "@react-native-community/hooks"

const windowDimensions = Dimensions.get("window")
const windowHeight = windowDimensions.height
const twoButtonWidth = windowDimensions.width / 2 - (space(2) + space(0.5))

export const ErrorPopUp: React.FC = () => {
  const insets = useSafeAreaInsets()
  const { popUpState } = usePopUpContext()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    })
  }, [])

  const keyboard = useKeyboard()
  const [size, onLayout] = useComponentSize()

  const { data, show } = popUpState
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

  const colors = colorsForTheme(data?.theme ? data.theme : "light")
  const showSecondaryButton = !!data?.secondaryButtonText && !!data?.secondaryButtonOnPress

  if (!data) {
    return null
  }

  return (
    <Theme>
      {show && (
        <AnimatedOverlay style={{ backgroundColor: animation.backgroundColor }}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={0}
            style={{ flex: 1, position: "relative" }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss()
              }}
              style={{
                height: "100%",
                width: "100%",
                zIndex: 3,
              }}
            />
            <AnimatedPopUp
              style={{
                transform: [{ translateY: animation.translateY }],
                bottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0,
              }}
              color={colors?.backgroundColor || color("white100")}
            >
              <Box p={2} onLayout={onLayout} pb={insets?.bottom}>
                {!!data?.icon && <Box mt={2}>{data?.icon}</Box>}
                <Spacer mt={2} />
                <Box>
                  <Sans size="5" color={colors?.primaryText}>
                    {data?.title}
                  </Sans>
                  {data?.note && (
                    <>
                      <Spacer mb={0.5} />
                      <Sans size="4" color={colors?.secondaryText}>
                        {data?.note}
                      </Sans>
                    </>
                  )}
                </Box>
                <Spacer mb={3} />
                <Separator color={colors?.separator} />
                <Flex flexDirection="row">
                  {showSecondaryButton && (
                    <>
                      <Button width={twoButtonWidth} variant="primaryWhite" onPress={data?.secondaryButtonOnPress}>
                        {data?.secondaryButtonText}
                      </Button>
                      <Spacer mr={1} />
                    </>
                  )}
                  <Button
                    width={showSecondaryButton ? twoButtonWidth : null}
                    variant="primaryBlack"
                    block={!showSecondaryButton}
                    onPress={() => data?.onClose?.()}
                  >
                    {data?.buttonText}
                  </Button>
                </Flex>
              </Box>
            </AnimatedPopUp>
          </KeyboardAvoidingView>
        </AnimatedOverlay>
      )}
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
  z-index: 99;
`

const Container = styled(Box)<{ color: string }>`
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  background-color: ${(p) => p.color};
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  overflow: hidden;
  z-index: 100;
`

const AnimatedPopUp = animated(Container)
const AnimatedOverlay = animated(Overlay)
