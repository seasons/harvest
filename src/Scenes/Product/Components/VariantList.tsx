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
    
      const buttonColors = size?.reservable > 0 ? {sizeColor: "black100", backgroundColor: "white"} 
      : {sizeColor: "black50", backgroundColor: "lightgrey"}
    return (
      <Flex key={size.id || i} paddingBottom={1.5}>
        <Flex>
          <Flex>
            {/* <Spacer mr={1} /> */}
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
                <StyledBox style={{backgroundColor: buttonColors.backgroundColor}}>
                  <Flex alignItems="center" paddingTop={1.5}>
                    <Sans color={color(buttonColors.sizeColor)} size="5">
                      {displaySize}
                    </Sans>
                    <Sans color="black50" size="3">
                      {manufacturerSizeFullDisplay}
                    </Sans>
                  </Flex>
                </StyledBox>
              </TouchableOpacity>
            )}
          </Flex>
        </Flex>
      </Flex>
    )
  })

  return (
    <Flex alignItems="center" paddingBottom={10}>
      <Box style={{ minHeight: variantPickerHeight - 60, width: "100%", padding: space(1) }}>
        <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between" paddingTop={2}>
          {rows}
        </Flex>
        <Box pb="180px" />
      </Box>
    </Flex>
  )
}

const StyledBox = styled(Box)`
  border: 1px lightgrey;
  border-radius: 7;
  width: 115;
  height: 75;
  padding-bottom: 20;
`
