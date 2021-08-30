import { useNavigation } from "@react-navigation/native"
import { color } from "App/utils"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { CloseXSVG } from "../../assets/svgs"
import { Box } from "./Box"

export type CloseButtonVariant = "light" | "dark" | "gray"

export const CloseButton: React.FC<{
  variant?: CloseButtonVariant
  overrides?: any
  onClose?: () => void
}> = ({ onClose, variant, overrides = {} }) => {
  const navigation = useNavigation()

  const borderWidth = variant === "light" ? 1 : 0
  let borderColor
  let backgroundColor

  switch (variant) {
    case "dark":
      borderColor = color("black100")
      backgroundColor = color("black85")
      break
    case "gray":
      borderColor = color("black50")
      backgroundColor = color("black50")
      break
    case "light":
      borderColor = color("black25")
      backgroundColor = color("black25")
      break
    default:
      borderColor = color("black10")
      backgroundColor = color("white100")
      break
  }

  return (
    <Wrapper style={{ right: overrides.right ?? 20 }}>
      <TouchableOpacity
        onPress={() => {
          onClose?.()
          navigation.goBack()
        }}
      >
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

const Circle = styled(Box)<{ variant: string }>`
  border-radius: 100;
  height: 40;
  width: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`
