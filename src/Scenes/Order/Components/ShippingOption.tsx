import { Flex, Sans, Spacer, Box } from "App/Components"
import { TouchableWithoutFeedback } from "react-native"
import { SmallCheckCircled } from "Assets/svgs"
import React from "react"
import styled from "styled-components"
import { color } from "styled-system"

export const ShippingOption = ({ option, index, shippingOptionIndex, setShippingOptionIndex }) => {
  const method = option?.shippingMethod
  let price
  if (option?.externalCost === 0) {
    price = "Free"
  } else {
    price = "$" + option?.externalCost / 100
  }
  const selected = index === shippingOptionIndex

  return (
    <TouchableWithoutFeedback onPress={() => setShippingOptionIndex(index)}>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" py={2}>
        <Sans size="4" color="black100">
          {method?.displayText}
        </Sans>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Sans size="4" color="black100">
            {price}
          </Sans>
          <Spacer mr={1} />
          {selected ? <SmallCheckCircled /> : <EmptyCircle />}
        </Flex>
      </Flex>
    </TouchableWithoutFeedback>
  )
}

const EmptyCircle = styled(Box)`
  height: 24;
  width: 24;
  border-radius: 12;
  border-color: ${color("black10")};
  border-width: 1;
`
