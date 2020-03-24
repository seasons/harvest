import { Box, Flex, Sans } from "App/Components"
import { Homepage_homepage_sections_results_Product_variants } from "App/generated/Homepage"
import { color } from "App/utils"
import React from "react"
import styled from "styled-components/native"

const weightedSize = {
  XXL: 6,
  XL: 5,
  L: 4,
  M: 3,
  S: 2,
  XS: 1,
  XXS: 0,
}

const sortedVariants = variants => {
  const sortedVars = variants.sort((a, b) => {
    if (weightedSize[a?.internalSize?.display] && weightedSize[b?.internalSize?.display]) {
      return weightedSize[a?.internalSize?.display] - weightedSize[b?.internalSize?.display]
    } else {
      return a?.internalSize?.display - b.internalSize.display
    }
  })
  return sortedVars
}

export const VariantSizes: React.FC<{
  variants: Homepage_homepage_sections_results_Product_variants[]
  size: "0" | "1"
}> = ({ variants, size }) => {
  const sortedSizes = sortedVariants(variants)
  return (
    <Flex flexDirection="row">
      {sortedSizes.map((variant: any) => {
        const reservable = variant.reservable !== null && !!variant.reservable
        return (
          <Box key={variant.id} mr={0.5} style={{ position: "relative" }}>
            <Sans size={size} color={reservable ? "black" : "black15"}>
              {variant.internalSize.display}
            </Sans>
            {!reservable && <Strikethrough size={size} />}
          </Box>
        )
      })}
    </Flex>
  )
}

const Strikethrough = styled.View`
  background-color: ${color("black15")};
  height: 2;
  width: 100%;
  position: absolute;
  top: ${p => (p.size === "0" ? 7 : 11)};
  left: 0;
`
