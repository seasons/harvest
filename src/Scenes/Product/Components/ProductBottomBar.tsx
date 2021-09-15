import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { GetProduct, GetProduct_products_brand_products_variants } from "App/generated/GetProduct"
import { GetProductMe } from "App/generated/GetProductMe"
import { BORDER_RADIUS } from "App/helpers/constants"
import { AddToBagButton } from "App/Scenes/Product/Components"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { DownChevronIcon } from "Assets/icons"
import { FadeBottom2 } from "Assets/svgs/FadeBottom2"
import { WhiteListCheck } from "Assets/svgs/WhiteListCheck"
import React, { useEffect, useState } from "react"
import { Animated, Dimensions, StyleSheet, Text, TouchableWithoutFeedback } from "react-native"
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

export const ProductBottomBar: React.FC<Props> = ({
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
  const isInBag = selectedVariant?.isInBag

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

  return (
    <Wrapper style={{ bottom: showNotifyMeMessage ? VARIANT_WANT_HEIGHT : 0 }}>
      <Flex flexDirection="column">
        <Animated.View style={{ zIndex: 30 }}>
          <SelectionBox>
            <Flex>
              <Flex flexDirection="row" alignItems="flex-end">
                <Sans size="7">${monthlyRental}</Sans>
                <Sans size="3" color="black50" mb={0.5}>
                  {" "}
                  / month
                </Sans>
              </Flex>
              <Sans size="3" color={color("black50")}>
                Retail ${retailPrice}
              </Sans>
            </Flex>

            <Flex flexDirection="row" justifyContent="flex-end">
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
                  <VariantSelectionButton>
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
              <Spacer mr={1} />
              {inStock || isInBag ? (
                <AddToBagButton
                  setShowSizeWarning={setShowSizeWarning}
                  variantInStock={inStock}
                  selectedVariant={selectedVariant}
                  data={data}
                  dataMe={dataMe}
                  width={130}
                />
              ) : (
                <StyledButton
                  Icon={hasNotification ? WhiteListCheck : null}
                  onPress={onNotifyMe}
                  loading={isMutatingNotify}
                  borderRadius={BORDER_RADIUS}
                  height={48}
                  width={129}
                >
                  <Sans size="4" color={color("white100")}>
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
  height: 48;
  border: 1px solid ${color("black25")};
  background-color: ${color("white100")};
  width: ${oneButtonWidth - 20};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: ${BORDER_RADIUS};
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
  border-top-width: 1px;
  border-color: ${color("black10")};
`
