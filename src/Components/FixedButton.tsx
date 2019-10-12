import React from "react"
import styled from "styled-components/native"
import { Button, ButtonProps } from "App/Components/Button"
import { Flex, Theme } from "App/Components"

interface Props extends ButtonProps {}

export const FixedButton: React.FC<Props> = props => {
  return (
    <Theme>
      <FlexWrapper p={2} alignContent="center" justiftContent="center" flexDirection="row">
        <Button {...props} size="large">
          {props.children}
        </Button>
      </FlexWrapper>
    </Theme>
  )
}

const FlexWrapper = styled(Flex)`
  position: absolute;
  bottom: 0;
  z-index: 100;
`
