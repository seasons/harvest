import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Schema, useTracking } from "App/utils/track"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"

interface OrderItemProps {
  productVariant: any
  index?: number
  navigation?: any
}

export const OrderItem: React.FC<OrderItemProps> = ({ productVariant, index, navigation }) => {
  const product = productVariant?.product
  const tracking = useTracking()

  if (!product) {
    return null
  }

  const imageURL = product?.images?.[0]?.url
  const variantSize = productVariant?.displayLong?.toLowerCase()

  return (
    <Box key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ProductTapped,
            actionType: Schema.ActionTypes.Tap,
            productSlug: product.slug,
            productId: product.id,
            productName: product.name,
          })
          navigation?.navigate("Product", { id: product.id, slug: product.slug })
        }}
      >
        <Container flexDirection="row">
          <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="4">{index + 1}</Sans>
              <Sans size="4">{product.brand.name}</Sans>
              <Sans size="4" color="black50">
                {product.name}
              </Sans>
              {!!variantSize && (
                <Sans size="4" color="black50">
                  Size {variantSize}
                </Sans>
              )}
            </Box>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            {!!imageURL && (
              <FadeInImage
                style={{ height: 170 * PRODUCT_ASPECT_RATIO, width: 170 }}
                resizeMode="contain"
                source={{ uri: imageURL }}
              />
            )}
          </Flex>
        </Container>
      </TouchableWithoutFeedback>
    </Box>
  )
}

const Container = styled(Flex)`
  background: white;
  overflow: hidden;
  height: 210px;
`
