import React from "react"
import styled from "styled-components/native"
import { Box } from "./Box"
import { CloseXSVG } from "../../assets/svgs"
import { TouchableOpacity } from "react-native"
import { color } from "App/utils"
import { useNavigation } from "@react-navigation/native"

export type CloseButtonVariant = "light" | "dark"

export const CloseButton: React.FC<{
  variant?: CloseButtonVariant
}> = ({ variant }) => {
  const navigation = useNavigation()

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

const Circle = styled(Box)<{ variant: string }>`
  background-color: ${(p) => (p?.variant === "light" ? color("white100") : color("black85"))};
  border-width: ${(p) => (p?.variant === "light" ? 1 : 0)};
  border-color: ${(p) => (p?.variant === "light" ? color("black10") : color("black100"))};
  border-radius: 100;
  height: 40;
  width: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`
