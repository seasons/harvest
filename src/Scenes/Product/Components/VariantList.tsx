import { space } from "@seasons/eclipse"
import { Box, Flex, Sans } from "App/Components"
import { GetProduct_products_variants } from "App/generated/GetProduct"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import { find } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

export const VariantList = ({ setSelectedVariant, selectedVariant, onSizeSelected, product }) => {
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

    const buttonColors =
      size?.reservable > 0
        ? { sizeColor: "black100", backgroundColor: "white100", textColor: "black50" }
        : { sizeColor: "black25", backgroundColor: "black04", textColor: "black25" }

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
            <StyledBox reservable={size?.reservable > 0} backgroundColor={buttonColors.backgroundColor}>
              <Flex alignItems="center" pt={1.5}>
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
      <Box style={{ padding: space(1), flex: 1}} width={425}>
        <Flex flexDirection="row" flexWrap="wrap" justifyContent="flex-start" pt={1.5} pl={1.5}>
          {rows}
        </Flex>
        <Box pb="180px" />
      </Box>
    </Flex>
  )
}

const StyledBox = styled(Box)<{ reservable: boolean; backgroundColor: string }>`
  border: 1px ${p => p.reservable ? color("black10") : color("black04")};
  background-color: ${p => color(p.backgroundColor)};
  border-radius: 7;
  width: 122;
  height: 75;
`
