import { Flex } from "App/Components"
import { Button, ButtonProps } from "App/Components/Button"
import React from "react"
import { KeyboardAvoidingView } from "react-native"
import styled from "styled-components/native"
import { space } from "App/utils"

interface Props extends ButtonProps {
  positionBottom?: number
  rightAligned?: boolean
}

export const FixedButton: React.FC<Props> = (props) => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <FlexWrapper
        px={2}
        rightAligned={props.rightAligned}
        positionBottom={props.positionBottom ? props.positionBottom : space(2)}
        alignContent="center"
        justiftContent="center"
        flexDirection="row"
      >
        <Button {...props}>{props.children}</Button>
      </FlexWrapper>
    </KeyboardAvoidingView>
  )
}

const FlexWrapper = styled(Flex)`
  position: absolute;
  bottom: ${(p) => p.positionBottom};
  z-index: 100;
  right: 0;
  right: ${(p) => (p.rightAligned ? 0 : "auto")};
  left: ${(p) => (p.rightAligned ? "auto" : 0)};
`
