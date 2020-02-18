import { Flex, Theme } from "App/Components"
import { Button, ButtonProps } from "App/Components/Button"
import React from "react"
import { KeyboardAvoidingView } from "react-native"
import styled from "styled-components/native"

interface Props extends ButtonProps {}

export const FixedButton: React.FC<Props> = props => {
  return (
    <Theme>
      <KeyboardAvoidingView behavior="padding">
        <FlexWrapper p={2} alignContent="center" justiftContent="center" flexDirection="row">
          <Button {...props}>{props.children}</Button>
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
