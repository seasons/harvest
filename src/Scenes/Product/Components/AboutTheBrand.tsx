import { Box, Sans, Spacer } from "App/Components"
import { DateTime } from "luxon"
import React from "react"

import { ProductInfoItem } from "./ProductInfoItem"

export const AboutTheBrand = ({ product }) => {
  const brandName = product?.brand?.name

  return (
    <Box p={2}>
      <Sans color="black" size="2">
        About the brand
      </Sans>
      <Spacer mb={2} />
      {!!brandName && <ProductInfoItem detailType="Brand Name" detailValue={brandName} />}
      {!!product?.since && (
        <ProductInfoItem detailType="Established" detailValue={DateTime.fromISO(product?.since || "").year} />
      )}
      <Spacer mb={2} />
    </Box>
  )
}
