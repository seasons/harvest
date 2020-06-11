import { useNavigation } from "@react-navigation/native"
import { Box, FadeInImage, Flex, Sans, Spacer, VariantSizes } from "App/Components"
import { SaveProductButton } from "App/Scenes/Product/Components"
import { Schema, useTracking } from "App/utils/track"
import React, { RefObject } from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { GetProduct_product } from "App/generated/GetProduct"

export const ProductGridItem: React.FC<{
  flatListRef?: RefObject<any>
  product: GetProduct_product
  addLeftSpacing?: boolean
  showBrandName?: boolean
}> = ({ flatListRef, product, addLeftSpacing, showBrandName }) => {
  const tracking = useTracking()
  const navigation = useNavigation()

  const itemWidth = Dimensions.get("window").width / 2 - 2
  const imageHeight = itemWidth * PRODUCT_ASPECT_RATIO
  const image = product?.images?.[0]?.url
  const productName = product?.name
  const brandName = product?.brand?.name

  return (
    <TouchableWithoutFeedback
      key={product.id}
      onPress={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductTapped,
          actionType: Schema.ActionTypes.Tap,
          productSlug: product.slug,
          productId: product.id,
        })
        navigation.navigate("Product", { id: product.id, slug: product.slug })
        if (!!flatListRef?.current) {
          // If the flatList is passed down we scroll to the top when the page is reloaded
          // this is used for when the product view is being reloaded with a new product
          flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
        }
      }}
    >
      <Box mr={addLeftSpacing ? 0.5 : 0} mb={0.5} width={itemWidth}>
        <FadeInImage source={{ uri: image }} style={{ width: itemWidth, height: imageHeight }} />
        <Flex flexDirection="row" justifyContent="space-between" alignItems="flex-start">
          <Box my={0.5} mx={1}>
            {(!!productName || !!brandName) && (
              <Sans size="0" style={{ maxWidth: itemWidth - 50 }}>
                {!!showBrandName && brandName !== "Vintage" ? brandName : productName}
              </Sans>
            )}
            <VariantSizes size="0" variants={product?.variants} />
          </Box>
          <Box mt={0.5}>
            <SaveProductButton
              grayStroke
              height={16}
              width={12}
              product={product}
              onPressSaveButton={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.SaveProductButtonTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
              }}
            />
          </Box>
        </Flex>
        <Spacer mb={0.5} />
      </Box>
    </TouchableWithoutFeedback>
  )
}
