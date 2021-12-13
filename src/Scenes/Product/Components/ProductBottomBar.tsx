import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { GetProduct, GetProduct_products_brand_products_variants } from "App/generated/GetProduct"
import { GetProductMe } from "App/generated/GetProductMe"
import { BORDER_RADIUS } from "App/helpers/constants"
import { AddToBagButton } from "App/Scenes/Product/Components"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { DownChevronIcon } from "Assets/icons"
import { BlackListCheck } from "Assets/svgs/BlackListCheck"
import React, { useEffect, useState } from "react"
import { Animated, Dimensions, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { VARIANT_WANT_HEIGHT } from "../Product"
import { FixedProductBuyCTA } from "../FixedProductBuyCTA"

interface Props {
  toggleShowVariantPicker: (show: boolean) => void
  setShowSizeWarning: (show: boolean) => void
  showVariantPicker: boolean
  selectedVariant
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
  isMutatingBuyButton: boolean
}

const twoButtonWidth = Dimensions.get("window").width / 2 - space(2) - space(0.5)
const oneButtonWidth = twoButtonWidth / 2

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
  isMutatingBuyButton,
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

  return (
    <Wrapper style={{ bottom: showNotifyMeMessage ? VARIANT_WANT_HEIGHT : 0 }}>
      <Flex flexDirection="column">
        <FixedProductBuyCTA
          price={selectedVariant?.price}
          scrollToBuyCTA={scrollToBuyCTA}
          showNotifyMeMessage={showNotifyMeMessage}
          animatedScrollY={animatedScrollY}
          isMutatingBuyButton={isMutatingBuyButton}
        />
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
                  variant={hasNotification ? "primaryGray" : "primaryBlack"}
                  Icon={hasNotification && BlackListCheck}
                  onPress={onNotifyMe}
                  loading={isMutatingNotify}
                  borderRadius={BORDER_RADIUS}
                  height={48}
                  width={129}
                >
                  Notify me
                </StyledButton>
              )}
            </Flex>
          </SelectionBox>
        </Animated.View>
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
  height: 100;
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
