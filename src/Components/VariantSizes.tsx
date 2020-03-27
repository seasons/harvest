import { Box, Flex, Sans } from "App/Components"
import { Homepage_homepage_sections_results_Product_variants } from "App/generated/Homepage"
import { color } from "App/utils"
import React from "react"
import styled from "styled-components/native"

export const VariantSizes: React.FC<{
  variants: Homepage_homepage_sections_results_Product_variants[]
  size: "0" | "1"
}> = ({ variants, size }) => {
  return (
    <Flex flexDirection="row">
      {variants.map((variant: any) => {
        const reservable = variant.reservable !== null && !!variant.reservable
        return (
          <Box key={variant.id} mr={0.5} style={{ position: "relative" }}>
            <Sans size={size} color={reservable ? "black" : "black15"}>
              {variant?.internalSize?.display}
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
