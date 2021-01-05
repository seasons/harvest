import { useNavigation } from "@react-navigation/native"
import { color } from "App/utils"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { CloseXSVG } from "../../assets/svgs"
import { Box } from "./Box"

export type CloseButtonVariant = "light" | "dark"

export const CloseButton: React.FC<{
  variant?: CloseButtonVariant
  overrides?: any
}> = ({ variant, overrides }) => {
  const navigation = useNavigation()

  const borderColor = variant === "light" ? color("black10") : color("black100")
  const backgroundColor = variant === "light" ? color("white100") : color("black85")
  const borderWidth = variant === "light" ? 1 : 0

  return (
    <Wrapper style={{ right: overrides.right ?? 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Circle
          variant={variant}
          style={{
            borderColor: overrides.borderColor ?? borderColor,
            backgroundColor: overrides.backgroundColor ?? backgroundColor,
            borderWidth: overrides.borderWidth ?? borderWidth,
          }}
        >
          <CloseXSVG variant={variant} />
        </Circle>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  position: absolute;
  top: 40;
  z-index: 100;
`

const Circle = styled(Box)<{ variant: string; borderColor: string; borderWidth: number; backgroundColor: string }>`
  border-radius: 100;
  height: 40;
  width: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`
