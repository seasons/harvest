import React from "react"
import styled from "styled-components/native"
import { Box } from "./Box"
import { CloseXSVG } from "../../assets/svgs"
import { TouchableOpacity } from "react-native"
import { color } from "App/Utils"

export type CloseButtonVariant = "light" | "dark"

export const CloseButton: React.FC<{
  navigation: any
  variant?: CloseButtonVariant
}> = ({ navigation, variant }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
  background-color: ${p => (p?.variant === "light" ? color("black15") : color("black85"))};
  border-radius: 100;
  height: 40;
  width: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`
