import { Box, Flex, Radio, Sans, Spacer } from "App/Components"
import { color } from "App/utils/color"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { Coupon } from "../../CreateAccount"
import { calcFinalPrice } from "./utils"
import { Schema as TrackSchema, useTracking } from "App/utils/track"

interface PlanButtonProps {
  shouldSelect: (plan: any) => void
  selected: boolean
  plan: any
  coupon?: Coupon
  lowestPlanPrice: number
}

export const PlanButton: React.FC<PlanButtonProps> = ({ lowestPlanPrice, shouldSelect, selected, plan, coupon }) => {
  const tracking = useTracking()
  const { price, name, caption } = plan
  const finalPrice = calcFinalPrice(price, coupon)
  const PriceText = ({ originalPrice, finalPrice }) => {
    originalPrice /= 100
    finalPrice /= 100
    const isDiscounted = originalPrice !== finalPrice && !!finalPrice
    return isDiscounted ? (
      <Text>
        <Sans color="black100" size="5">
          ${finalPrice}
        </Sans>
        <Sans color="black100" size="5">
          {" "}
        </Sans>
        <Sans color="black50" size="5" style={{ textDecorationLine: "line-through", textDecorationStyle: "solid" }}>
          ${originalPrice}
        </Sans>
      </Text>
    ) : (
      <Text>
        <Sans color="black100" size="5">
          ${originalPrice}
        </Sans>
      </Text>
    )
  }

  const onPress = (plan) => {
    shouldSelect(plan)
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.PlanTapped,
      actionType: TrackSchema.ActionTypes.Tap,
      planID: plan?.id,
      planName: plan?.name,
    })
  }

  const monthlyPrice = plan.price / 12
  const planDiscount = 100 - (monthlyPrice / lowestPlanPrice) * 100
  const showYearlyDiscount = plan.planID === "access-yearly" && selected && planDiscount

  return (
    <TouchableOpacity onPress={() => onPress(plan)}>
      <StyledFlex
        alignItems="center"
        flexDirection="row"
        width="100%"
        height={72}
        mb={1}
        px={2}
        justifyContent="space-between"
        selected={selected}
      >
        {showYearlyDiscount && (
          <PlanDiscount px={0.5}>
            <Sans size="3" color="white100">
              {planDiscount}% Off
            </Sans>
          </PlanDiscount>
        )}
        <Flex flexDirection="row">
          <Radio selected={selected} pointerEvents="none" />
          <Spacer mr={1} />
          <Flex flexDirection="column">
            <Sans color="black100" size="5">
              {name}
            </Sans>
            <Sans size="2" color="black50">
              {caption}
            </Sans>
          </Flex>
        </Flex>
        <PriceText originalPrice={price} finalPrice={finalPrice} />
      </StyledFlex>
    </TouchableOpacity>
  )
}

const StyledFlex = styled(Flex)<{ selected: boolean }>`
  border-radius: 8;
  background-color: ${color("black04")};
  z-index: 10;
  elevation: 6;
  border-color: ${(p) => (p.selected ? color("black100") : color("white100"))};
  border-width: 1px;
  position: relative;
`

const PlanDiscount = styled(Box)`
  position: absolute;
  top: -10;
  right: 20;
  border-radius: 4;
  background-color: ${color("black100")};
`
