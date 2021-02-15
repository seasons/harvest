import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { BackArrowIcon } from "../../assets/icons"
import { Box } from "./Box"
import { Flex } from "./Flex"
import { themeProps } from "./Theme"

type FixedBackArrowVariant =
  | "blackBackground"
  | "whiteBackground"
  | "productBackground"
  | "whiteTransparent"
  | "blackTransparent"
type RotationDegree = "0deg" | "90deg" | "180deg" | "270deg"

export const FixedBackArrow: React.FC<{
  navigation: any
  variant?: FixedBackArrowVariant
  onPress?: () => void
  rotationDegree?: RotationDegree
  overrides?: any
}> = ({ navigation, variant, onPress, rotationDegree = "0deg", overrides = {} }) => {
  const getColorsForVariant = (variant: FixedBackArrowVariant) => {
    const {
      colors: { black100, white100, black10, productBackgroundColor },
    } = themeProps

    switch (variant) {
      case "blackBackground":
        return {
          backgroundColor: black100,
          arrowColor: white100,
        }
      case "whiteBackground":
        return {
          backgroundColor: white100,
          arrowColor: black100,
        }
      case "productBackground":
        return {
          backgroundColor: productBackgroundColor,
          arrowColor: black100,
        }
      case "whiteTransparent":
        return {
          backgroundColor: "rgba(0,0,0,0)",
          arrowColor: white100,
        }
      case "blackTransparent":
        return {
          backgroundColor: "rgba(0,0,0,0)",
          arrowColor: black100,
        }
      default:
        return {
          backgroundColor: black10,
          arrowColor: black100,
        }
    }
  }

  const variantColors = getColorsForVariant(variant)

  return (
    <Wrapper style={{ left: overrides.left ?? 7, top: overrides.top ?? 50, transform: [{ rotate: rotationDegree }] }}>
      <TouchableOpacity onPress={!!onPress ? onPress : () => navigation.goBack()}>
        <ArrowWrapper backgroundColor={variantColors.backgroundColor} borderColor={overrides.borderColor}>
          <Arrow color={variantColors.arrowColor} />
        </ArrowWrapper>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Arrow = styled(BackArrowIcon)`
  left: 4;
`

const Wrapper = styled(Box)`
  position: absolute;
  z-index: 2000;
`

const ArrowWrapper = styled(Flex)<{ backgroundColor: string; borderColor?: string }>`
  flex-direction: row;
  background-color: ${(p) => p.backgroundColor};
  border-radius: 100;
  border-width: ${(p) => (p.borderColor ? 1 : 0)};
  border-color: ${(p) => p.borderColor ?? "#FFFFFF"};
  height: 40;
  width: 40;
  align-items: center;
  justify-content: center;
`
