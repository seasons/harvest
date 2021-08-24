import { space } from "@seasons/eclipse"
import { Box, Flex, Sans } from "App/Components"
import { GetProduct_products_variants } from "App/generated/GetProduct"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { find } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const VariantList = ({ setSelectedVariant, selectedVariant, onSizeSelected, product, variantPickerHeight }) => {
  const variants: GetProduct_products_variants[] = product?.variants
  const [sizeData, setSizeData] = useState([])
  const tracking = useTracking()
  // const height = product?.variants.length >= 3 ? variantPickerHeight / 3 : variantPickerHeight / 2.5

  useEffect(() => {
    updateSizeData()
  }, [product])

  const updateSizeData = () => {
    setSizeData(variants)

    // Update size data
    if (variants?.length && !variants.includes(selectedVariant)) {
      const firstAvailableSize =
        find(variants, (size) => size.isInBag) || find(variants, (size) => size.reservable > 0) || variants?.[0]
      setSelectedVariant(firstAvailableSize)
    } else if (variants?.length) {
      const variant = find(variants, (size) => size.id === selectedVariant.id)
      // Refresh variant data
      setSelectedVariant(variant)
    }
  }

  const rows = sizeData.map((size, i) => {
    const displaySize = size?.displayLong
    const displayShort = size?.displayShort

    const manufacturerSizeDisplayType = size?.manufacturerSizes?.[0]?.type
    const manufacturerSizeDisplay = size?.manufacturerSizes?.[0]?.display

    const manufacturerSizeFullDisplay =
      manufacturerSizeDisplayType !== "Letter" &&
      manufacturerSizeDisplay !== displaySize &&
      manufacturerSizeDisplay !== displayShort &&
      !!manufacturerSizeDisplayType &&
      `${manufacturerSizeDisplayType ? manufacturerSizeDisplayType + " " : ""}${manufacturerSizeDisplay}`

    const buttonColors =
      size?.reservable > 0
        ? { sizeColor: "black100", backgroundColor: "white100", textColor: "black50" }
        : { sizeColor: "black35", backgroundColor: "black04", textColor: "black35" }

    const StyledBox = styled(Box)`
      border: 1px ${size.reservable > 0? color("black10") : color("black04")};
      background-color: ${color(buttonColors.backgroundColor)};
      border-radius: 7;
      width: 122;
      height: 75;
    `
    return (
      <Flex key={size.id || i} pb={1} pr={1}>
        {displaySize && (
          <TouchableOpacity
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.ProductVariantSelected,
                actionType: Schema.ActionTypes.Tap,
                size: displaySize,
                variantID: size?.id,
              })
              setSelectedVariant(size)
              onSizeSelected(size)
            }}
          >
            <StyledBox>
              <Flex alignItems="center" pt={1.5} >
                <Sans color={color(buttonColors.sizeColor)} size="5">
                  {displaySize}
                </Sans>
                <Sans color={color(buttonColors.textColor)} size="3">
                  {manufacturerSizeFullDisplay}
                </Sans>
              </Flex>
            </StyledBox>
          </TouchableOpacity>
        )}
      </Flex>
    )
  })

  return (
    <Flex alignItems="center" pb={1}>
      <Box style={{ minHeight: variantPickerHeight + 60, width: "110%", padding: space(1)}}>
        <Flex flexDirection="row" flexWrap="wrap" justifyContent="flex-start" pt={1.5} pl={1.5}>
          {rows}
        </Flex>
        <Box pb="180px" />
      </Box>
    </Flex>
  )
}
