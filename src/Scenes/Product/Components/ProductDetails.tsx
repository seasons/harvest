import React from "react"
import { Box, Sans, Separator, Spacer, Flex } from "App/Components"
import { color } from "App/Utils"
import { ProductInfoItem } from "./ProductInfoItem"

export const ProductDetails = ({ product }) => {
  if (!product) {
    return null
  }
  return (
    <Box p={2} mb={3}>
      {product.name && (
        <>
          <Sans size="3" color="black">
            {product.name}
          </Sans>
          <Spacer mb={1} />
        </>
      )}
      {product.brandByBrandId && product.brandByBrandId.name && (
        <>
          <Sans size="2" color="gray">
            {product.brandByBrandId.name}
          </Sans>
          <Spacer mb={1} />
        </>
      )}
      {product.description && (
        <>
          <Sans size="2" color="gray">
            {product.description}
          </Sans>
          <Spacer mb={1} />
        </>
      )}
      <Spacer mb={2} />
      <Separator color={color("lightGray")} />
      {product.modelSize && <ProductInfoItem detailType="Fit" detailValue={product.modelSize} />}
      {product.retailPrice && <ProductInfoItem detailType="Retail price" detailValue={"$" + product.retailPrice} />}
    </Box>
  )
}
