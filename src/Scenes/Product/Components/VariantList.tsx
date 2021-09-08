import { Button, Flex } from "App/Components"
import { GetProduct_products_variants } from "App/generated/GetProduct"
import { Schema, useTracking } from "App/utils/track"
import { find } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { ScrollView } from "react-native"

export const VariantList = ({ setSelectedVariant, selectedVariant, onSizeSelected, product }) => {
  const variants: GetProduct_products_variants[] = product?.variants
  const [sizeData, setSizeData] = useState([])
  const tracking = useTracking()
  const scrollRef = useRef(null)

  const updateSizeData = () => {
    setSizeData(variants)

    // Update size data
    if (variants?.length && !variants.includes(selectedVariant)) {
      const firstAvailableSize =
        find(variants, (size) => size.isInBag) || find(variants, (size) => size.reservable > 0) || variants?.[0]
      setSelectedVariant(firstAvailableSize)
      const itemIndex = variants.findIndex((v) => v.id === firstAvailableSize.id)
      scrollRef?.current?.scrollTo({ x: (itemIndex + 1) * 97, y: 0, animated: true })
    } else if (variants?.length) {
      const variant = find(variants, (size) => size.id === selectedVariant.id)
      // Refresh variant data
      setSelectedVariant(variant)
      const itemIndex = variants.findIndex((v) => v.id === variant.id)
      scrollRef?.current?.scrollTo({ x: (itemIndex + 1) * 97, y: 0, animated: true })
    }
  }

  useEffect(() => {
    if (variants?.length > 0) {
      updateSizeData()
    }
  }, [variants, updateSizeData])

  const rows = sizeData.map((size, i) => {
    const displaySize = size?.displayLong

    return (
      <Flex key={size.id || i} pb={1} pr={i === sizeData.length - 1 ? 2 : 1} pl={i === 0 ? 2 : 0}>
        {displaySize && (
          <Button
            variant="primaryWhite"
            disabled={size?.reservable <= 0}
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
            {displaySize}
          </Button>
        )}
      </Flex>
    )
  })

  return (
    <Flex style={{ flex: 1 }} pt={2}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollRef}>
        {rows}
      </ScrollView>
    </Flex>
  )
}
