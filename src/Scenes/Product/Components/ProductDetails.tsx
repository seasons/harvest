import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import { GetProduct_product } from "App/generated/GetProduct"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import { useNavigation } from "@react-navigation/native"

import { ProductInfoItem } from "./ProductInfoItem"
import { SaveProductButton } from "./SaveProductButton"

// FIXME: Fix types here
export const ProductDetails: React.FC<{
  selectedVariant: any
  product: GetProduct_product
}> = ({ selectedVariant, product }) => {
  const tracking = useTracking()
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
          <TouchableOpacity
            onPress={() => {
              const brandID = product?.brand?.id
              const brandSlug = ""
              tracking.trackEvent({
                actionName: Schema.ActionNames.BrandTapped,
                actionType: Schema.ActionTypes.Tap,
                brandSlug,
                brandID,
              })
              navigation.navigate("Brand", { id: brandID, slug: brandSlug })
            }}
          >
            <Sans size="1" color={color("black50")} style={{ textDecorationLine: "underline" }}>
              {brandName}
            </Sans>
          </TouchableOpacity>
        </Box>
        {!!(selectedVariant && selectedVariant.id) && (
          <SaveButtonWrapper>
            <SaveProductButton selectedVariant={selectedVariant} product={product} />
          </SaveButtonWrapper>
        )}
      </Flex>
      <Spacer mb={1} />
      {description && (
        <Sans size="1" color={color("black50")} lineHeight={26}>
          {description.trim()}
        </Sans>
      )}
      <Spacer mb={3} />
      <Separator color={color("black15")} />
      {product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {!!product.modelSize && !!product.modelHeight && (
        <ProductInfoItem
          detailType="Fit"
          detailValue={`Model is ${modelHeightDisplay(product.modelHeight)} in a ${product.modelSize.display}`}
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

const SaveButtonWrapper = styled(Box)`
  top: -${space(2)};
  right: -${space(2)};
`
