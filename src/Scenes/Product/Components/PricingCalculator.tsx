import { Box, Flex, Sans, Separator } from "App/Components"
import { color } from "App/utils/color"
import React, { useState } from "react"
import { Dimensions } from "react-native"
import Collapsible from "react-native-collapsible"

import Slider from "@react-native-community/slider"

import { CollapseHeader } from "./CollapseHeader"

const thumbImage = require(`../../../../assets/images/PricingSlider.png`)
const windowWidth = Dimensions.get("window").width

export const PricingCalculator = ({ product }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [value, setValue] = useState(0)

  const rentalPrice = product?.rentalPrice

  if (!rentalPrice) {
    return null
  }

  const maxDays = 18
  const floor = rentalPrice * 0.4
  const dayPrice = (rentalPrice - floor) / maxDays
  const displayPrice = floor + Math.round(dayPrice * value)

  return (
    <Box px={2} mb={4}>
      <CollapseHeader
        title="Pricing calculator"
        isCollapsed={isCollapsed}
        handleOnPress={() => setIsCollapsed(!isCollapsed)}
      />
      <Collapsible collapsed={isCollapsed}>
        <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" py={2}>
          <Box width={60}>
            <Sans size="5">{`$${displayPrice}`}</Sans>
            <Sans size="3" color="black50">
              {`${12 + value}-days`}
            </Sans>
          </Box>
          <Flex px={2} flexDirection="row" flexWrap="nowrap" alignItems="center">
            <Slider
              style={{ width: windowWidth - 184, height: 40 }}
              minimumValue={0}
              maximumValue={maxDays}
              thumbImage={thumbImage}
              minimumTrackTintColor={color("black100")}
              step={1}
              value={value}
              maximumTrackTintColor={color("black10")}
              onValueChange={(v) => {
                setValue(v)
              }}
            />
          </Flex>
          <Box width={60}>
            <Sans size="5" textAlign="right">
              {`$${rentalPrice}`}
            </Sans>
            <Sans size="3" color="black50" textAlign="right">
              1 Month
            </Sans>
          </Box>
        </Flex>
        <Separator />
        <Box pt={2}>
          <Sans size="3" color="black50">
            There’s a 40% floor price for all rentals. Drag the slider to see how much you’d pay. Want it longer than a
            month? We’ll pro-rate the extra days.
          </Sans>
        </Box>
      </Collapsible>
    </Box>
  )
}
