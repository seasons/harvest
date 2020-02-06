import { sortVariants } from "App/helpers/sortVariants"
import { Flex, Box, Sans } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import styled from "styled-components/native"
import { Homepage_homepage_sections_results_Product_variants } from "App/generated/Homepage"

export const VariantSizes: React.FC<{
  variants: Homepage_homepage_sections_results_Product_variants[]
  size: "0" | "1"
}> = ({ variants, size }) => {
  const sortedVariants = sortVariants(variants)
  return (
    <Flex flexDirection="row">
      {sortedVariants.map((variant: any) => {
        const reservable = variant.reservable !== null && !!variant.reservable
        return (
          <Box key={variant.id} mr={0.5} style={{ position: "relative" }}>
            <Sans size={size} color={reservable ? "black" : "black15"}>
              {variant.size}
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
