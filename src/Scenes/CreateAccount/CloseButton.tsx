import { Box } from "App/Components"
import { color } from "App/utils"
import { CloseXSVG } from "Assets/svgs"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

type CloseButtonVariant = "light" | "dark"

const CloseButton: React.FC<{
  variant?: CloseButtonVariant
  onRequestClose?: () => void
}> = ({ variant, onRequestClose }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onRequestClose}>
        <Circle variant={variant}>
          <CloseXSVG variant={variant} />
        </Circle>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 40;
  right: 20;
  z-index: 100;
`

const Circle = styled(Box)`
  background-color: ${(p) => (p?.variant === "light" ? color("black10") : color("black85"))};
  border-radius: 100;
  height: 40;
  width: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default CloseButton
