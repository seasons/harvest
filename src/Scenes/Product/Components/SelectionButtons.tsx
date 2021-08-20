import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { GetProduct, GetProduct_products_brand_products_variants } from "App/generated/GetProduct"
import { AddToBagButton } from "App/Scenes/Product/Components"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { DownChevronIcon } from "Assets/icons"
import { WhiteListCheck } from "Assets/svgs/WhiteListCheck"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import React, { useEffect, useState } from "react"
import { Animated, Dimensions, TouchableWithoutFeedback, StyleSheet, Text } from "react-native"
import styled from "styled-components/native"
import { VARIANT_WANT_HEIGHT } from "../Product"
import { GetProductMe } from "App/generated/GetProductMe"
import { BORDER_RADIUS } from "App/helpers/constants"

interface Props {
  toggleShowVariantPicker: (show: boolean) => void
  setShowSizeWarning: (show: boolean) => void
  showVariantPicker: boolean
  selectedVariant: GetProduct_products_brand_products_variants
  showNotifyMeMessage: boolean
  data: GetProduct
  onNotifyMe: () => void
  scrollToBuyCTA: () => void
  hasNotification: boolean
  isMutatingNotify: boolean
  animatedScrollY: Animated.Value
  dataMe: GetProductMe
  retailPrice: number
  monthlyRental: number
  productType: string
}

const twoButtonWidth = Dimensions.get("window").width / 2 - space(2) - space(0.5)
const oneButtonWidth = twoButtonWidth / 2
const buyCtaHeight = space(2) + space(3) + 20

const renderBuyCTA = ({ price, scrollToBuyCTA, animatedScrollY, showNotifyMeMessage }) => {
  const opacity = animatedScrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
  })

  let cta
  if (price && price.buyUsedEnabled && price.buyUsedPrice) {
    cta = (
      <UnderlinedSans size="5" onPress={scrollToBuyCTA}>
        {" "}
        Buy for{" "}
        {(price.buyUsedPrice / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </UnderlinedSans>
    )
  } else if (price && price.buyNewEnabled && price.buyNewPrice && price.buyNewAvailableForSale) {
    cta = (
      <UnderlinedSans size="5" onPress={scrollToBuyCTA}>
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
        zIndex: 29,
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
      />
      <Flex paddingBottom="3" justifyContent="center" flexDirection="row">
        {cta}
      </Flex>
    </Animated.View>
  ) : null
}

export const SelectionButtons: React.FC<Props> = ({
  dataMe,
  hasNotification,
  showNotifyMeMessage,
  selectedVariant,
  showVariantPicker,
  toggleShowVariantPicker,
  data,
  isMutatingNotify,
  onNotifyMe,
  setShowSizeWarning,
  scrollToBuyCTA,
  animatedScrollY,
  retailPrice,
  monthlyRental,
  productType,
}) => {
  const tracking = useTracking()
  const [loaded, setLoaded] = useState(false)
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
    scrollToBuyCTA,
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
        <Animated.View style={{ zIndex: 30 }}>
          <SelectionBox>
            <RateSection>
              <Flex flexDirection="row">
                <Sans size="4">${monthlyRental}</Sans>
                <Sans size="4"> / month</Sans>
              </Flex>
              <Sans size="4" color={color("black50")}>
                Retail ${retailPrice}
              </Sans>
            </RateSection>

            <Flex flexDirection="row" justifyContent="space-between" width={230}>
              <TouchableWithoutFeedback
                onPress={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.SizeButtonTapped,
                    actionType: Schema.ActionTypes.Tap,
                  })
                  toggleShowVariantPicker(!showVariantPicker)
                }}
              >
                {productType === "Accessory" ? (
                  <Box></Box>
                ) : (
                  <VariantSelectionButton borderRadius={BORDER_RADIUS}>
                    <Flex px={2} style={{ width: "100%" }} flexDirection="row" justifyContent="center">
                      <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
                        <Sans size="4" color={color("black100")}>
                          {selectedVariant?.displayShort}
                        </Sans>
                        <Spacer mr={1} />
                        <DownChevronIcon color={color("black100")} rotate={showVariantPicker} />
                      </Flex>
                    </Flex>
                  </VariantSelectionButton>
                )}
              </TouchableWithoutFeedback>
              {inStock ? (
                <AddToBagButton
                  setShowSizeWarning={setShowSizeWarning}
                  variantInStock={inStock}
                  width={twoButtonWidth - 45}
                  selectedVariant={selectedVariant}
                  data={data}
                  dataMe={dataMe}
                />
              ) : (
                <StyledButton
                  Icon={hasNotification ? WhiteListCheck : null}
                  width={twoButtonWidth - 45}
                  onPress={onNotifyMe}
                  loading={isMutatingNotify}
                  borderRadius={BORDER_RADIUS}
                  height={55}
                >
                  <Sans size="5" color={color("white100")}>
                    Notify me
                  </Sans>
                </StyledButton>
              )}
            </Flex>
          </SelectionBox>
        </Animated.View>
        {BuyCTA}
      </Flex>
    </Wrapper>
  )
}

const VariantSelectionButton = styled.View`
  height: 55;
  border: 1px solid ${color("black25")};
  border-width: 1;
  background-color: ${color("white100")};
  width: ${oneButtonWidth - 20};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Wrapper = styled.View`
  position: absolute;
  left: 0;
  height: ${40 + buyCtaHeight};
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

const SelectionBox = styled(Flex)`
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: ${color("white100")};
  height: 100%;
  padding: ${space(2)}px;
  border: 1px ${color("black25")};
`

const RateSection = styled(Flex)`
  padding: ${space(1)}px;
  height: 75%;
`