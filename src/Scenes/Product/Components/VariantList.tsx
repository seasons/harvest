import { Box, Flex, Radio, Sans, Separator, Spacer } from "App/Components"
import { GetProduct_products_variants } from "App/generated/GetProduct"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { find } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"

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
    if (variants?.length && !selectedVariant.id) {
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
    const manufacturerSizeDisplay = size?.manufacturerSizes?.length > 0 && size?.manufacturerSizes?.[0]?.display
    return (
      <Box key={size.id || i}>
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
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap" my={2}>
            <Flex flexDirection="row" alignItems="center">
              <Radio selected={!!selectedVariant?.id && selectedVariant.id === size.id} pointerEventsNone />
              <Spacer mr={1} />
              {displaySize && (
                <Sans color={size?.reservable > 0 ? color("white100") : color("black50")} size="4">
                  {displaySize}
                </Sans>
              )}
            </Flex>
            <Sans color="black50" size="4">
              {size?.reservable > 0 ? manufacturerSizeDisplay : "Unavailable"}
            </Sans>
          </Flex>
        </TouchableOpacity>
        <Separator color={color("black85")} />
      </Box>
    )
  })

  return (
    <Box style={{ minHeight: variantPickerHeight - 60 }}>
      <Separator color={color("black85")} />
      {rows}
      <Box pb="180px" />
    </Box>
  )
}
