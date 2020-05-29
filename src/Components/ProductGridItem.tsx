import { useNavigation } from "@react-navigation/native"
import { Box, FadeInImage, Flex, Sans, Spacer, VariantSizes } from "App/Components"
import { imageResize } from "App/helpers/imageResize"
import { SaveProductButton } from "App/Scenes/Product/Components"
import { Schema, useTracking } from "App/utils/track"
import { get } from "lodash"
import React from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"

const IMAGE_HEIGHT = 240

export const ProductGridItem = ({ product, addLeftSpacing, showBrandName }) => {
  const tracking = useTracking()
  const navigation = useNavigation()
  const itemWidth = Dimensions.get("window").width / 2 - 2
  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "thumb")
  // const isLeft = index % 2 === 0
  const productName = product?.name || ""
  const brandName = product?.brand?.name || ""

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
      }}
    >
      <Box mr={addLeftSpacing ? 0.5 : 0} mb={0.5} width={itemWidth}>
        <FadeInImage source={{ uri: resizedImage }} style={{ width: "100%", height: IMAGE_HEIGHT }} />
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
