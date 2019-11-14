import { Box, Sans, Spacer } from "App/Components"
import { DateTime } from "luxon"
import React from "react"

import { ProductInfoItem } from "./ProductInfoItem"

export const AboutTheBrand = ({ product }) => {
  const {
    since,
    brand: { name: brandName },
  } = product

  return (
    <Box p={2}>
      <Sans color="black" size="2">
        About the brand
      </Sans>
      <Spacer mb={2} />
      <ProductInfoItem detailType="Brand Name" detailValue={brandName} />
      {since && <ProductInfoItem detailType="Established" detailValue={DateTime.fromISO(since).year} />}
      <Spacer mb={2} />
    </Box>
  )
}
