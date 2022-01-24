import { Box, Flex, Sans } from "App/Components"
import React from "react"
import { Animated, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { FadeBottom3 } from "Assets/svgs/FadeBottom3"
import { color, space } from "App/utils"
import { Spinner } from "App/Components/Spinner"
import { ChevronIcon } from "Assets/icons"

const FIXED_PRODUCT_BUY_CTA_HEIGHT = space(2) + space(3) + 30

export const FixedProductBuyCTA: React.FC<{
  price: any
  scrollToBuyCTA: () => void
  animatedScrollY: any
  showNotifyMeMessage: boolean
  isMutatingBuyButton: boolean
}> = ({ price, scrollToBuyCTA, animatedScrollY, showNotifyMeMessage, isMutatingBuyButton }) => {
  const opacity = animatedScrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  })

  const availableForBuyNew = price && price.buyNewEnabled && price.buyNewPrice && price.buyNewAvailableForSale
  const availableForBuyUsed = price && price.buyUsedEnabled && price.buyUsedAdjustedPrice

  const CTA = () => {
    if (isMutatingBuyButton) {
      return (
        <Flex flexDirection="row" alignItems="center" justifyContent="center" height={20}>
          <Spinner />
        </Flex>
      )
    } else {
      return (
        <TouchableOpacity onPress={scrollToBuyCTA}>
          <Flex flexDirection="row" alignItems="center">
            <Sans size="4" underline>
              Buy for ${price.buyUsedAdjustedPrice / 100}
            </Sans>
            <ChevronCircle>
              <ChevronIcon
                color={color("white100")}
                backgroundColor={color("black100")}
                rotateDeg="90deg"
                scale={0.5}
              />
            </ChevronCircle>
          </Flex>
        </TouchableOpacity>
      )
    }
  }

  if (!(availableForBuyNew || availableForBuyUsed) || showNotifyMeMessage) {
    return null
  }

  return (
    <FixedWrapper>
      <Animated.View
        style={{
          opacity,
          zIndex: 29,
          width: "100%",
        }}
      >
        <FadeBottom3
          style={{
            position: "absolute",
            width: 800,
            left: 0,
            height: FIXED_PRODUCT_BUY_CTA_HEIGHT,
          }}
        />
        <Flex py={2} justifyContent="center" alignItems="flex-end" flexDirection="row" height="100%">
          <CTA />
        </Flex>
      </Animated.View>
    </FixedWrapper>
  )
}

const FixedWrapper = styled(Box)`
  position: absolute;
  top: -${FIXED_PRODUCT_BUY_CTA_HEIGHT};
  left: 0;
  width: 100%;
  height: ${FIXED_PRODUCT_BUY_CTA_HEIGHT};
`

const ChevronCircle = styled(Box)`
  margin-left: 8;
  display: flex;
  border-radius: 100;
  background-color: ${color("black100")};
  height: 15;
  width: 15;
  justify-content: center;
  align-items: center;
`
