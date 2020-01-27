import { sortVariants } from "App/helpers/sortVariants"
import { Flex, Box, Sans } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import styled from "styled-components/native"

export const VariantSizes: React.FC<{
  variants: any
  size: "0" | "1"
}> = ({ variants, size }) => {
  const sortedVariants = sortVariants(variants)
  return (
    <Flex flexDirection="row">
      {sortedVariants.map(variant => {
        const reservable = !!variant.reservable
        return (
          <Box key={variant.id} mr={0.5} style={{ position: "relative" }}>
            <Sans size={size} color={reservable ? "black" : "lightgray"}>
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
  background-color: ${color("lightgray")};
  height: 2;
  width: 100%;
  position: absolute;
  top: ${p => (p.size === "0" ? 7 : 11)};
  left: 0;
`
