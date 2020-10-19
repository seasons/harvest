import { Flex, Sans } from "App/Components"
import { CouponType } from "App/generated/globalTypes"
import { color } from "App/utils/color"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { calcFinalPrice } from "./utils"

interface PlanButtonProps {
  shouldSelect: (plan: any) => void
  selected: boolean
  plan: any
  selectedColor?: string
  coupon?: {
    discount: number
    type: CouponType
  }
}

export const PlanButton: React.FC<PlanButtonProps> = ({ shouldSelect, selected, plan, selectedColor, coupon }) => {
  const { price, itemCount } = plan
  const finalPrice = calcFinalPrice(price, coupon?.discount, coupon?.type)
  const PriceText = ({ originalPrice, finalPrice }) => {
    originalPrice /= 100
    finalPrice /= 100
    const isDiscounted = originalPrice != finalPrice
    return isDiscounted ? (
      <Text>
        <Sans color="black50" size="0.5">
          / month
        </Sans>
        <Sans color="black100" size="1">
          {" "}
        </Sans>
        <Sans color="black50" size="1" style={{ textDecorationLine: "line-through", textDecorationStyle: "solid" }}>
          ${originalPrice}
        </Sans>
        <Sans color="black100" size="1">
          {" "}
          ${finalPrice}
        </Sans>
      </Text>
    ) : (
      <Text>
        <Sans color="black50" size="0.5">
          per month
        </Sans>
        <Sans color="black100" size="1">
          {" "}
          ${originalPrice}
        </Sans>
      </Text>
    )
  }

  return (
    <PlanSelectionBorder width="100%" p={0.5} selected={selected} selectedColor={selectedColor}>
      <TouchableOpacity onPress={() => shouldSelect(plan)}>
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
