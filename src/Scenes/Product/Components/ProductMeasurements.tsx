import { Box } from "App/Components"
import React from "react"
import { ProductInfoItem } from "./ProductInfoItem"
import { GetProduct_products_variants } from "App/generated/GetProduct"
import gql from "graphql-tag"

export const ProductMeasurementsFragment_ProductVariant = gql`
  fragment ProductMeasurementsFragment_ProductVariant on ProductVariant {
    id
    displayShort
    internalSize {
      id
      display
      type
      bottom {
        id
        waist
        rise
        hem
        inseam
      }
      top {
        id
        length
        sleeve
        shoulder
        chest
      }
    }
  }
`

export const ProductMeasurements: React.FC<{
  selectedVariant: GetProduct_products_variants
}> = ({ selectedVariant }) => {
  const internalSize = selectedVariant?.internalSize
  const displayShort = selectedVariant?.displayShort
  const topSizes = internalSize?.top
  const bottomSizes = internalSize?.bottom

  const waistByLengthDisplay =
    displayShort !== internalSize?.display && internalSize?.type === "WxL" && internalSize?.display

  if (
    !selectedVariant?.displayLong &&
    !topSizes?.length &&
    !topSizes?.sleeve &&
    !topSizes?.shoulder &&
    !topSizes?.chest &&
    !bottomSizes?.waist &&
    !bottomSizes?.rise &&
    !bottomSizes?.hem &&
    !bottomSizes?.inseam
  ) {
    return null
  }

  return (
    <Box px={2} mb={3}>
      <ProductInfoItem detailType="Measurements" detailValue="" />

      {!!selectedVariant?.displayLong && (
        <ProductInfoItem detailType="Size" detailValue={selectedVariant?.displayLong} />
      )}

      {!!topSizes?.length && <ProductInfoItem detailType="Length" detailValue={`${topSizes?.length}"`} />}
      {!!topSizes?.sleeve && <ProductInfoItem detailType="Sleeve" detailValue={`${topSizes?.sleeve}"`} />}
      {!!topSizes?.shoulder && <ProductInfoItem detailType="Shoulders" detailValue={`${topSizes?.shoulder}"`} />}
      {!!topSizes?.chest && <ProductInfoItem detailType="Chest" detailValue={`${topSizes?.chest}"`} />}

      {!!waistByLengthDisplay && <ProductInfoItem detailType="Waist by length" detailValue={waistByLengthDisplay} />}
      {!!bottomSizes?.waist && <ProductInfoItem detailType="Waist" detailValue={`${bottomSizes?.waist}"`} />}
      {!!bottomSizes?.rise && <ProductInfoItem detailType="Rise" detailValue={`${bottomSizes?.rise}"`} />}
      {!!bottomSizes?.hem && <ProductInfoItem detailType="Hem" detailValue={`${bottomSizes?.hem}"`} />}
      {!!bottomSizes?.inseam && <ProductInfoItem detailType="Inseam" detailValue={`${bottomSizes?.inseam}"`} />}
    </Box>
  )
}
function head(manufacturerSizes: import("App/generated/GetProduct").GetProduct_products_variants_manufacturerSizes[]) {
  throw new Error("Function not implemented.")
}
