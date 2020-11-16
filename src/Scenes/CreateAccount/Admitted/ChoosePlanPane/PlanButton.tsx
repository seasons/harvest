import { Flex, Sans } from "App/Components"
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
  selectedColor?: string
  coupon?: Coupon
}

export const PlanButton: React.FC<PlanButtonProps> = ({ shouldSelect, selected, plan, selectedColor, coupon }) => {
  const tracking = useTracking()
  const { price, itemCount } = plan
  const finalPrice = calcFinalPrice(price, coupon)
  const PriceText = ({ originalPrice, finalPrice }) => {
    originalPrice /= 100
    finalPrice /= 100
    const isDiscounted = originalPrice !== finalPrice && !!finalPrice
    return isDiscounted ? (
      <Text>
        <Sans color="black100" size="0.5">
          This month
        </Sans>
        <Sans color="black100" size="1">
          {" "}
          ${finalPrice}
        </Sans>
        <Sans color="black100" size="1">
          {" "}
        </Sans>
        <Sans color="black50" size="1" style={{ textDecorationLine: "line-through", textDecorationStyle: "solid" }}>
          ${originalPrice}
        </Sans>
      </Text>
    ) : (
      <Text>
        <Sans color="black50" size="0.5">
          Per month
        </Sans>
        <Sans color="black100" size="1">
          {" "}
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

  return (
    <PlanSelectionBorder width="100%" p={0.5} selected={selected} selectedColor={selectedColor}>
      <TouchableOpacity onPress={() => onPress(plan)}>
        <StyledFlex
          alignItems="center"
          flexDirection="row"
          width="100%"
          height={48}
          px={2}
          justifyContent="space-between"
        >
          <Sans color="black100" size="1">
            {itemCount} items
          </Sans>
          <PriceText originalPrice={price} finalPrice={finalPrice} />
        </StyledFlex>
      </TouchableOpacity>
    </PlanSelectionBorder>
  )
}

const StyledFlex = styled(Flex)`
  border-radius: 28;
  background-color: ${color("black04")};
  z-index: 10;
  elevation: 6;
`

const PlanSelectionBorder = styled(Flex)<{ selected: boolean; selectedColor: string }>`
  border-radius: 28;
  border-color: ${(p) => (p.selected ? p.selectedColor : color("white100"))};
  border-width: 1px;
  background: ${color("white100")};
  z-index: 0;
`
