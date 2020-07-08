import { Box, Flex, Radio, Sans, Separator, Spacer } from "App/Components"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { find } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { GetProduct_product_variants } from "App/generated/GetProduct"

export interface Variant extends GetProduct_product_variants {
  sizeDisplay?: string
}

export const sizeToName = (size) => {
  switch (size) {
    case "XS":
      return "X-Small"
    case "S":
      return "Small"
    case "M":
      return "Medium"
    case "L":
      return "Large"
    case "XL":
      return "X-Large"
  }
}

const sizeDataForVariants = (variants = [], type) => {
  if (type === "Top") {
    return variants?.map((variant) => {
      return { ...variant, sizeDisplay: sizeToName(variant?.internalSize?.display) }
    })
  } else if (type === "Bottom") {
    return variants?.map((variant) => {
      return { ...variant, sizeDisplay: variant?.internalSize?.bottom?.value }
    })
  }
}

export const VariantList = ({ setSelectedVariant, selectedVariant, onSizeSelected, product, variantPickerHeight }) => {
  const variants = product?.variants
  const type = product?.type
  const [sizeData, setSizeData] = useState([])
  const tracking = useTracking()

  useEffect(() => {
    updateSizeData()
  }, [])

  const updateSizeData = () => {
    const variantData = sizeDataForVariants(variants, type)
    setSizeData(variantData)

    // Update size data
    if (variantData?.length) {
      const firstAvailableSize =
        find(variantData, (size: Variant) => size.isInBag) ||
        find(variantData, (size: Variant) => size.reservable > 0) ||
        variantData?.[0]
      setSelectedVariant(firstAvailableSize)
    }
  }

  const rows = sizeData.map((size: Variant, i) => {
    const manufacturerSize = (size?.manufacturerSizes?.length > 0 && size?.manufacturerSizes?.[0]?.display) || ""
    return (
      <Box key={size.id || i}>
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.ProductVariantSelected,
              actionType: Schema.ActionTypes.Tap,
              size: size?.internalSize?.display,
              variantID: size?.id,
            })
            setSelectedVariant(size)
            onSizeSelected(size)
          }}
        >
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap" my={2}>
            <Flex flexDirection="row" alignItems="center">
              <Radio selected={!!selectedVariant.id && selectedVariant.id === size.id} pointerEventsNone />
              <Spacer mr={1} />
              {size?.sizeDisplay && (
                <Sans color={size?.reservable > 0 ? color("white100") : color("black50")} size="1">
                  {size.sizeDisplay}
                </Sans>
              )}
            </Flex>
            <Sans color="black50" size="1">
              {size?.reservable > 0 ? manufacturerSize : "Unavailable"}
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
