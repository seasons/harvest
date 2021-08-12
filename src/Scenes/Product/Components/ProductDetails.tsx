import { Box, Flex, Sans, Separator, Spacer } from "App/Components"
import { GetProduct_products } from "App/generated/GetProduct"
import { color, space } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import React from "react"
import { TouchableOpacity, Dimensions } from "react-native"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import { ProductInfoItem } from "./ProductInfoItem"
import { SaveProductButton } from "./SaveProductButton"

const screenWidth = Dimensions.get("window").width

export const ProductDetails: React.FC<{
  selectedVariant: any
  product: GetProduct_products
}> = ({ selectedVariant, product }) => {
  const tracking = useTracking()
  const navigation = useNavigation()
  if (!product?.variants) {
    return null
  }

  const { name, description } = product

  const brandName = product?.brand?.name

  const modelHeightDisplay = (modelHeight) => {
    const height = parseInt(modelHeight)
    const feet = Math.floor(height / 12)
    const inches = height % 12
    if (!!feet && !!inches) {
      return `${feet}'${inches}"`
    } else {
      return `${feet}'`
    }
  }

  const modelDetailValue =
    !!product.modelSize &&
    !!product.modelHeight &&
    `Model is ${modelHeightDisplay(product.modelHeight)} in a ${product.modelSize.type === "WxL" ? "WxL " : ""}${
      product.modelSize.display
    }`
  return (
    <Box pt={2} px={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start">
        <Box width={screenWidth - space(6) - 30}>
          <Sans size="4" color={color("black100")}>
            {name}
          </Sans>
          {!!brandName && (
            <TouchableOpacity
              onPress={() => {
                const brandID = product?.brand?.id
                const brandSlug = product?.brand?.slug
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BrandTapped,
                  actionType: Schema.ActionTypes.Tap,
                  brandSlug,
                  brandID,
                  brandName,
                })
                navigation.navigate("Brand", { id: brandID, slug: brandSlug, name: brandName })
              }}
            >
              <Sans size="4" color={color("black50")} style={{ textDecorationLine: "underline" }}>
                {brandName}
              </Sans>
            </TouchableOpacity>
          )}
        </Box>
        <SaveButtonWrapper>
          <SaveProductButton
            height={21}
            width={16}
            selectedVariant={selectedVariant}
            product={product}
            onPressSaveButton={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.SaveProductButtonTapped,
                actionType: Schema.ActionTypes.Tap,
              })
            }}
          />
        </SaveButtonWrapper>
      </Flex>
      <Spacer mb={1} />
      {!!description && (
        <Sans size="4" color={color("black50")} lineHeight={26}>
          {description.trim()}
        </Sans>
      )}
      <Spacer mb={3} />
      <Separator color={color("black10")} />
      {!!product.color && <ProductInfoItem detailType="Color" detailValue={product.color.name} />}
      {!!product.modelSize && !!product.modelHeight && (
        <ProductInfoItem detailType="Fit" detailValue={modelDetailValue} />
      )}
      {!!product.outerMaterials && (
        <ProductInfoItem detailType="Materials" detailValue={product.outerMaterials.join(", ")} />
      )}
      {!!product.brand && <ProductInfoItem detailType="Brand" detailValue={product.brand.name} />}
      {!!product.retailPrice && <ProductInfoItem detailType="Retail price" detailValue={"$" + product.retailPrice} />}
      {!!(product.rentalPrice || 40) && <ProductInfoItem detailType="Monthly Rental" detailValue={"$" + (product.rentalPrice || 40)} />}
    </Box>
  )
}

const SaveButtonWrapper = styled(Box)`
  top: -${space(2)};
  right: -${space(2)};
  padding-top: ${space(2)};
`
