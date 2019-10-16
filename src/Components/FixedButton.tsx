import React, { useState, useEffect } from "react"
import styled from "styled-components/native"
import { Button, ButtonProps } from "App/Components/Button"
import { Flex, Theme } from "App/Components"
import { KeyboardAvoidingView, NativeModules, StatusBarIOS } from "react-native"

interface Props extends ButtonProps {}

export const FixedButton: React.FC<Props> = props => {
  const [statusBarHeight, setStatusBarHeight] = useState(0)
  let statusBarListener = null

  useEffect(() => {
    const { StatusBarManager } = NativeModules
    if (StatusBarManager && StatusBarManager.getHeight) {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height)
      })
      statusBarListener = StatusBarIOS.addListener("statusBarFrameWillChange", statusBarData => {
        setStatusBarHeight(statusBarData.frame.height)
      })
    }

    return statusBarListener.remove()
  }, [])

  return (
    <Theme>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={statusBarHeight}>
        <FlexWrapper p={2} alignContent="center" justiftContent="center" flexDirection="row">
          <Button {...props} size="large">
            {props.children}
          </Button>
        </FlexWrapper>
      </KeyboardAvoidingView>
    </Theme>
  )
}

const FlexWrapper = styled(Flex)`
  position: absolute;
  bottom: 0;
  z-index: 100;
`
