import { Box, Flex, Radio, Sans, Separator, Spacer } from "App/Components"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { capitalize, find, head } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"

export interface Size {
  id: string
  name: string
  reservable: number
  size: string
  stock: number
  manufacturerSize: string
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
  const manufacturerSize = (variant) => {
    return (variant.manufacturerSizes?.length > 0 && variant.manufacturerSizes?.[0]?.display) || ""
  }

  if (type === "Top") {
    const sizeData = {
      XS: {},
      S: {},
      M: {},
      L: {},
      XL: {},
    }
    for (let size in sizeData) {
      sizeData[size] = {
        id: "",
        size: sizeToName(size),
        reservable: 0,
        stock: 0,
      }
    }

    if (variants) {
      for (let variant of variants) {
        const { id, internalSize, reservable, isInBag } = variant
        const size = internalSize.display

        sizeData[size] = {
          id,
          size: sizeToName(size),
          reservable,
          stock: reservable,
          manufacturerSize: manufacturerSize(variant),
          isInBag,
        }
      }
    }
    return sizeData
  } else if (type === "Bottom") {
    const sizeData: any = {}
    for (let variant of variants) {
      const { id, reservable, isInBag } = variant

      if (!variant.internalSize) {
        continue
      }

      const size = variant.internalSize?.bottom?.value

      sizeData[size] = {
        id,
        size,
        reservable,
        manufacturerSize: manufacturerSize(variant),
        stock: reservable,
        isInBag,
      }
    }

    return sizeData
  }
}

export const VariantList = ({ setSelectedVariant, selectedVariant, onSizeSelected, product }) => {
  const variants = product?.variants
  const type = product?.type
  const [sizeData, setSizeData] = useState({})
  const tracking = useTracking()

  useEffect(() => {
    updateSizeData()
  }, [])

  const updateSizeData = () => {
    const sizeData = sizeDataForVariants(variants, type)
    setSizeData(sizeData)

    // Update size data
    const firstAvailableSize =
      find(sizeData, (size: Size) => size.isInBag) ||
      find(sizeData, (size: Size) => size.stock > 0) ||
      sizeData[head(Object.keys(sizeData))]
    setSelectedVariant(firstAvailableSize)
  }

  const rows = Object.values(sizeData).map((size: Size, i) => {
    return (
      <Box key={size.id || i}>
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.ProductVariantSelected,
              actionType: Schema.ActionTypes.Tap,
              size: size.size,
              variantID: size.id,
            })
            setSelectedVariant(size)
            onSizeSelected(size)
          }}
        >
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap" my={2}>
            <Flex flexDirection="row" alignItems="center">
              <Radio selected={selectedVariant.id === size.id} pointerEventsNone />
              <Spacer mr={1} />
              <Sans color={size.stock ? color("white100") : color("black50")} size="1">
                {capitalize(size.size)}
              </Sans>
            </Flex>
            <Sans color="gray" size="1">
              {size.stock ? size.manufacturerSize : "Unavailable"}
            </Sans>
          </Flex>
        </TouchableOpacity>
        <Separator color={color("black85")} />
      </Box>
    )
  })

  return (
    <>
      <Separator color={color("black85")} />
      {rows}
    </>
  )
}
