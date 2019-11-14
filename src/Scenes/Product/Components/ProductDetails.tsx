import { Box, Sans, Separator, Spacer } from "App/Components"
import { color } from "App/Utils"
import React from "react"

import { ProductInfoItem } from "./ProductInfoItem"

export const ProductDetails = ({ product }) => {
  if (!product) {
    return null
  }

  const {
    name,
    description,
    brand: { name: brandName },
  } = product

  return (
    <Box p={2} mb={3}>
      <Sans size="3" color="black">
        {name}
      </Sans>
      <Spacer mb={1} />

      <Sans size="1" color="gray">
        {brandName}
      </Sans>
      <Spacer mb={1} />

      <Sans size="1" color="gray" lineHeight={26}>
        {description}
      </Sans>
      <Spacer mb={1} />

      <Spacer mb={2} />
      <Separator color={color("lightGray")} />
      {product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {product.modelSize && <ProductInfoItem detailType="Fit" detailValue={`Model size is ${product.modelSize}`} />}
      {product.outerMaterials && (
        <ProductInfoItem detailType="Materials" detailValue={product.outerMaterials.join(", ")} />
      )}
      {product.brand && <ProductInfoItem detailType="Brand" detailValue={product.brand.name} />}
      {product.retailPrice && <ProductInfoItem detailType="Retail price" detailValue={"$" + product.retailPrice} />}
    </Box>
  )
}
