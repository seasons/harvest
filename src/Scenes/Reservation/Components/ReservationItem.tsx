import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { Schema, useTracking } from "App/utils/track"
import { head } from "lodash"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { ProductPriceText } from "@seasons/eclipse"

interface ReservationItemProps {
  bagItem: any
  index?: number
  navigation?: any
}

export const ReservationItem: React.FC<ReservationItemProps> = ({ bagItem, index, navigation }) => {
  const tracking = useTracking()
  const product = bagItem?.productVariant?.product
  const variantToUse = head(
    (bagItem?.productVariant?.product?.variants || []).filter((a) => a.id === bagItem?.productVariant?.id)
  )
  if (!product || !variantToUse) {
    return null
  }

  const imageURL = product?.images?.[0]?.url
  const variantSize = variantToUse?.displayShort

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
        <ReservationItemContainer flexDirection="row">
          <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="3">{`${index + 1}. ${product.brand.name}`}</Sans>
              <ProductPriceText size="3" product={product} />

              {!!variantSize && (
                <Sans size="3" color="black50">
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
        </ReservationItemContainer>
      </TouchableWithoutFeedback>
    </Box>
  )
}

const ReservationItemContainer = styled(Flex)`
  background: white;
  overflow: hidden;
  height: 210px;
`
