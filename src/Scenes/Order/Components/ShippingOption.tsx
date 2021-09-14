import { Box, Flex, Sans, Spacer } from "App/Components"
import { color } from "App/utils/color"
import { SmallCheckCircled } from "Assets/svgs"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"

export const ShippingOption = ({ option, index, shippingOptionIndex, setShippingOptionIndex }) => {
  const method = option?.shippingMethod
  const selected = index === shippingOptionIndex

  return (
    <TouchableWithoutFeedback onPress={() => setShippingOptionIndex(index)}>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center" py={2}>
        <Sans size="4" color="black100">
          {method?.displayText}
        </Sans>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
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
