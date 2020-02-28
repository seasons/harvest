import { Box, Sans, Separator, Spacer, Flex } from "App/Components"
import { color } from "App/Utils"
import React from "react"
import { ProductInfoItem } from "./ProductInfoItem"
import { SaveProductButton } from "./SaveProductButton"
import { GetProduct_product } from "App/generated/GetProduct"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

// FIXME: Fix types here
export const ProductDetails: React.FC<{
  setPopUp: any
  selectedVariant: any
  product: GetProduct_product
}> = ({ setPopUp, selectedVariant, product }) => {
  const navigation = useNavigation()
  if (!product || !product.variants) {
    return <></>
  }

  const {
    name,
    description,
    brand: { name: brandName },
  } = product

  const modelHeightDisplay = modelHeight => {
    const height = parseInt(modelHeight)
    const feet = Math.floor(height / 12)
    const inches = height % 12
    if (!!feet && !!inches) {
      return `${feet}'${inches}"`
    } else {
      return `${feet}'`
    }
  }

  return (
    <Box pt={2} px={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box>
          <Sans size="1" color={color("black100")}>
            {name}
          </Sans>
          <TouchableOpacity onPress={() => navigation.navigate("Brand", { id: product?.brand?.id })}>
            <Sans size="1" color={color("black50")} style={{ textDecorationLine: "underline" }}>
              {brandName}
            </Sans>
          </TouchableOpacity>
        </Box>
        {!!(selectedVariant && selectedVariant.id) && (
          <SaveProductButton selectedVariant={selectedVariant} product={product} setPopUp={setPopUp} />
        )}
      </Flex>
      <Spacer mb={1} />
      <Sans size="1" color={color("black50")} lineHeight={26}>
        {description}
      </Sans>
      <Spacer mb={3} />
      <Separator color={color("black15")} />
      {product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {!!product.modelSize && !!product.modelHeight && (
        <ProductInfoItem
          detailType="Fit"
          detailValue={`Model is ${modelHeightDisplay(product.modelHeight)} in a ${product.modelSize}`}
        />
      )}
      {product.outerMaterials && (
        <ProductInfoItem detailType="Materials" detailValue={product.outerMaterials.join(", ")} />
      )}
      {product.brand && <ProductInfoItem detailType="Brand" detailValue={product.brand.name} />}
      {product.retailPrice && <ProductInfoItem detailType="Retail price" detailValue={"$" + product.retailPrice} />}
    </Box>
  )
}
