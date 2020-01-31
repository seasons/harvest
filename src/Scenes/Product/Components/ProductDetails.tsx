import { Box, Sans, Separator, Spacer, Flex } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import { ProductInfoItem } from "./ProductInfoItem"
import { SaveProductButton } from "./SaveProductButton"
import { GetProduct_product, GetProduct_product_variants } from "App/generated/GetProduct"

// FIXME: Fix types here
export const ProductDetails: React.FC<{
  setPopUp: any
  selectedVariant: any
  product: GetProduct_product
}> = ({ setPopUp, selectedVariant, product }) => {
  if (!(selectedVariant && selectedVariant.id) || !(product && product.variants)) {
    return <></>
  }

  if (!product) {
    return null
  }

  const {
    name,
    description,
    brand: { name: brandName },
  } = product

  return (
    <Box pt={2} px={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box>
          <Sans size="1" color="black">
            {name}
          </Sans>
          <Sans size="1" color="gray">
            {brandName}
          </Sans>
        </Box>
        <SaveProductButton selectedVariant={selectedVariant} product={product} setPopUp={setPopUp} />
      </Flex>
      <Spacer mb={1} />
      <Sans size="1" color="gray" lineHeight={26}>
        {description}
      </Sans>
      <Spacer mb={1} />
      <Spacer mb={2} />
      <Separator color={color("black15")} />
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
