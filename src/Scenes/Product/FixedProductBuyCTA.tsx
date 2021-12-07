import { Box, Flex, Sans } from "App/Components"
import React from "react"
import { Animated, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { FadeBottom3 } from "Assets/svgs/FadeBottom3"
import { space } from "App/utils"
import { Spinner } from "App/Components/Spinner"

const FIXED_PRODUCT_BUY_CTA_HEIGHT = space(2) + space(3) + 30

export const FixedProductBuyCTA: React.FC<{
  price: any
  handleCreateDraftOrder: (x) => void
  animatedScrollY: any
  showNotifyMeMessage: boolean
  isMutatingBuyButton: boolean
}> = ({ price, handleCreateDraftOrder, animatedScrollY, showNotifyMeMessage, isMutatingBuyButton }) => {
  const opacity = animatedScrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  })

  const availableForBuyNew = price && price.buyNewEnabled && price.buyNewPrice && price.buyNewAvailableForSale
  const availableForBuyUsed = price && price.buyUsedEnabled && price.buyUsedPrice

  const CTA = () => {
    if (isMutatingBuyButton) {
      return (
        <Flex flexDirection="row" alignItems="center" justifyContent="center" height={20}>
          <Spinner />
        </Flex>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={() => handleCreateDraftOrder(availableForBuyNew ? OrderType.BUY_NEW : OrderType.BUY_USED)}
        >
          <Sans size="4" underline>
            Buy for ${price.buyUsedPrice / 100}
          </Sans>
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
