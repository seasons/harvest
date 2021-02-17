import { Button, Flex, Sans, Spacer } from "App/Components"
import { GetProduct, GetProduct_products_brand_products_variants } from "App/generated/GetProduct"
import { AddToBagButton } from "App/Scenes/Product/Components"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { DownChevronIcon } from "Assets/icons"
import { WhiteListCheck } from "Assets/svgs/WhiteListCheck"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useEffect, useState } from "react"
import { Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from "react-native"
import styled from "styled-components/native"
import { VARIANT_WANT_HEIGHT } from "../Product"

interface Props {
  toggleShowVariantPicker: (show: boolean) => void
  setShowSizeWarning: (show: boolean) => void
  showVariantPicker: boolean
  selectedVariant: GetProduct_products_brand_products_variants
  showNotifyMeMessage: boolean
  data: GetProduct
  onNotifyMe: () => void
  onBuyNew: () => void
  onBuyUsed: () => void
  hasNotification: boolean
  isMutatingNotify: boolean
  animatedScrollY: Animated.Value
}

const twoButtonWidth = Dimensions.get("window").width / 2 - space(2) - space(0.5)
const buyCtaHeight = space(2) + space(3) + 20

const renderBuyCTA = ({ price, onBuyNew, onBuyUsed, animatedScrollY, showNotifyMeMessage }) => {
  const opacity = animatedScrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  })

  let cta
  if (price && price.buyUsedEnabled && price.buyUsedPrice) {
    cta = (
      <UnderlinedSans size="4" onPress={onBuyUsed}>
        {" "}
        Buy used for{" "}
        {(price.buyUsedPrice / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </UnderlinedSans>
    )
  } else if (price && price.buyNewEnabled && price.buyNewPrice && price.buyNewAvailableForSale) {
    cta = (
      <UnderlinedSans size="4" onPress={onBuyNew}>
        Buy new for{" "}
        {(price.buyNewPrice / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </UnderlinedSans>
    )
  }

  return cta && !showNotifyMeMessage ? (
    <Animated.View
      style={{
        opacity,
      }}
    >
      <FadeBottom2
        style={{
          flexDirection: "row",
          justifyContent: "center",
          ...StyleSheet.absoluteFillObject,
          top: -20,
          height: buyCtaHeight + 20,
        }}
      ></FadeBottom2>
      <Flex paddingBottom="3" justifyContent="center" flexDirection="row">
        {cta}
      </Flex>
    </Animated.View>
  ) : null
}

export const SelectionButtons: React.FC<Props> = (props) => {
  const tracking = useTracking()
  const [loaded, setLoaded] = useState(false)
  const {
    hasNotification,
    showNotifyMeMessage,
    selectedVariant,
    showVariantPicker,
    toggleShowVariantPicker,
    data,
    isMutatingNotify,
    onNotifyMe,
    setShowSizeWarning,
    onBuyUsed,
    onBuyNew,
    animatedScrollY,
  } = props
  const inStock = selectedVariant && selectedVariant.reservable > 0

  useEffect(() => {
    // Wait to load the buttons until we know their state so user doesn't see the state change on load
    if (typeof selectedVariant?.reservable === "number" && !loaded) {
      setLoaded(true)
    }
  }, [setLoaded, selectedVariant])

  if (!loaded) {
    return null
  }

  const BuyCTA = renderBuyCTA({
    price: selectedVariant?.price,
    onBuyUsed,
    onBuyNew,
    animatedScrollY,
    showNotifyMeMessage,
  })
  const selectionButtonsTopOffset = BuyCTA
    ? animatedScrollY.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [0, 0, buyCtaHeight - space(2), buyCtaHeight - space(2)],
      })
    : buyCtaHeight - space(2)

  return (
    <Wrapper style={{ bottom: showNotifyMeMessage ? VARIANT_WANT_HEIGHT : 0 }}>
      <Flex flexDirection="column">
        <Animated.View style={{ transform: [{ translateY: selectionButtonsTopOffset }] }}>
          <Flex px={2} paddingBottom={2} justifyContent="space-between" flexWrap="nowrap" flexDirection="row">
            <TouchableWithoutFeedback
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.SizeButtonTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                toggleShowVariantPicker(!showVariantPicker)
              }}
            >
              <VariantSelectionButton>
                <Flex px={2} style={{ width: "100%" }} flexDirection="row" justifyContent="center">
                  <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
                    <Sans size="4" color="black">
                      {selectedVariant?.displayLong}
                    </Sans>
                    <Spacer mr={1} />
                    <DownChevronIcon color={color("black")} rotate={showVariantPicker} />
                  </Flex>
                </Flex>
              </VariantSelectionButton>
            </TouchableWithoutFeedback>
            {inStock ? (
              <AddToBagButton
                setShowSizeWarning={setShowSizeWarning}
                variantInStock={inStock}
                width={twoButtonWidth}
                selectedVariant={selectedVariant}
                data={data}
              />
            ) : (
              <StyledButton
                Icon={hasNotification ? WhiteListCheck : null}
                width={twoButtonWidth}
                onPress={onNotifyMe}
                loading={isMutatingNotify}
              >
                Notify me
              </StyledButton>
            )}
          </Flex>
        </Animated.View>
        {BuyCTA}
      </Flex>
    </Wrapper>
  )
}

const VariantSelectionButton = styled.View`
  height: 48;
  border: 1px solid ${color("black")};
  border-width: 1;
  border-radius: 28;
  background-color: white;
  width: ${twoButtonWidth};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Wrapper = styled.View`
  position: absolute;
  left: 0;
  height: ${48 + buyCtaHeight};
  width: 100%;
  z-index: 1;
`

const StyledButton = styled(Button)`
  & {
    path {
      stroke: ${color("white100")};
    }
  }
`

const UnderlinedSans = styled(Sans)`
  text-decoration: underline;
`
