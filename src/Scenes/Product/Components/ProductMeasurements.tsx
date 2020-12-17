import { Box } from "App/Components"
import React from "react"
import { ProductInfoItem } from "./ProductInfoItem"
import {
  GetProduct_products_brand_products_variants_internalSize_top,
  GetProduct_products_brand_products_variants,
} from "App/generated/GetProduct"

export const ProductMeasurements: React.FC<{
  selectedVariant: GetProduct_products_brand_products_variants
}> = ({ selectedVariant }) => {
  if (!selectedVariant) {
    return null
  }

  console.log("selectedVariant", selectedVariant)

  const topSizes: GetProduct_products_brand_products_variants_internalSize_top = selectedVariant?.internalSize?.top

  if (!topSizes?.letter && !topSizes?.length && !topSizes?.sleeve && !topSizes?.shoulder && !topSizes?.chest) {
    return null
  }

  return (
    <Box px={2} mb={3}>
      <ProductInfoItem detailType="Measurements" detailValue="" />
      {!!topSizes?.letter && <ProductInfoItem detailType="Size" detailValue={selectedVariant?.display?.long} />}
      {!!topSizes?.length && <ProductInfoItem detailType="Length" detailValue={`${topSizes?.length}"`} />}
      {!!topSizes?.sleeve && <ProductInfoItem detailType="Sleeve" detailValue={`${topSizes?.sleeve}"`} />}
      {!!topSizes?.shoulder && <ProductInfoItem detailType="Shoulders" detailValue={`${topSizes?.shoulder}"`} />}
      {!!topSizes?.chest && <ProductInfoItem detailType="Chest" detailValue={`${topSizes?.chest}"`} />}
    </Box>
  )
}
