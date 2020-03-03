import React from "react"
import styled from "styled-components/native"
import { Flex } from "./Flex"
import { BackArrowIcon } from "../../assets/icons"
import { TouchableOpacity } from "react-native"
import { Box } from "./Box"
import { themeProps } from "./Theme"

type FixedBackArrowVariant = "blackBackground" | "whiteBackground" | "black04Background"

export const FixedBackArrow: React.FC<{
  navigation: any
  variant?: FixedBackArrowVariant
}> = ({ navigation, variant }) => {
  const getColorsForVariant = (variant: FixedBackArrowVariant) => {
    const {
      colors: { black100, white100, black15, black04 },
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
      case "black04Background":
        return {
          backgroundColor: black04,
          arrowColor: black100,
        }
      default:
        return {
          backgroundColor: black15,
          arrowColor: black100,
        }
    }
  }

  const variantColors = getColorsForVariant(variant)

  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
  z-index: 50;
`

const ArrowWrapper = styled(Flex)`
  flex-direction: row;
  background-color: ${p => p.backgroundColor};
  border-radius: 100;
  height: 40;
  width: 40;
  align-items: center;
  justify-content: center;
`
