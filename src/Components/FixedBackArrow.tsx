import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { BackArrowIcon } from "../../assets/icons"
import { Box } from "./Box"
import { Flex } from "./Flex"
import { themeProps } from "./Theme"

type FixedBackArrowVariant = "blackBackground" | "whiteBackground" | "productBackground" | "whiteTransparent"
type RotationDegree = "0deg" | "90deg" | "180deg" | "270deg"

export const FixedBackArrow: React.FC<{
  navigation: any
  variant?: FixedBackArrowVariant
  onPress?: () => void
  rotationDegree?: RotationDegree
}> = ({ navigation, variant, onPress, rotationDegree }) => {
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
      default:
        return {
          backgroundColor: black10,
          arrowColor: black100,
        }
    }
  }

  const variantColors = getColorsForVariant(variant)

  return (
    <Wrapper style={{ transform: [{ rotate: rotationDegree }] }}>
      <TouchableOpacity onPress={!!onPress ? onPress : () => navigation.goBack()}>
        <ArrowWrapper backgroundColor={variantColors.backgroundColor}>
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
  top: 50;
  left: 7;
  z-index: 2000;
`

const ArrowWrapper = styled(Flex)<{ backgroundColor: string }>`
  flex-direction: row;
  background-color: ${(p) => p.backgroundColor};
  border-radius: 100;
  height: 40;
  width: 40;
  align-items: center;
  justify-content: center;
`
