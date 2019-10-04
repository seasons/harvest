import React from "react"
import { Box, Sans, Spacer } from "App/Components"
import { ProductInfoItem } from "./ProductInfoItem"

export const AboutTheBrand = ({ product }) => {
  //FIXME: Needs based in and established and logo
  return (
    <Box p={2}>
      <Sans color="black" size="2">
        About the brand
      </Sans>
      <Spacer mb={2} />
      <ProductInfoItem detailType="Established" detailValue="" />
      <ProductInfoItem detailType="Based in" detailValue="" />
      <Spacer mb={2} />
      <Sans color="black" size="2">
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit
        amet non magna.
      </Sans>
    </Box>
  )
}
