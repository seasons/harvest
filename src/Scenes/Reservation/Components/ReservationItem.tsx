import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Schema, useTracking } from "App/utils/track"
import { get, head } from "lodash"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

interface ReservationItemProps {
  bagItem: any
  index?: number
  sectionHeight: number
  navigation?: any
}

export const ReservationItem: React.FC<ReservationItemProps> = ({ bagItem, index, sectionHeight, navigation }) => {
  const tracking = useTracking()
  const product = bagItem?.productVariant?.product
  const variantToUse = head(
    (bagItem?.productVariant?.product?.variants || []).filter((a) => a.id === bagItem?.productVariant?.id)
  )
  if (!product || !variantToUse) {
    return null
  }

  const imageURL = product?.images?.[0]?.url
  const variantSize = get(variantToUse, "internalSize.display")

  return (
    <Box key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ProductTapped,
            actionType: Schema.ActionTypes.Tap,
            productSlug: product.slug,
            productId: product.id,
          })
          navigation?.navigate("Product", { id: product.id, slug: product.slug })
        }}
      >
        <ReservationItemContainer flexDirection="row">
          <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="2">{index + 1}</Sans>
              <Sans size="2">{product.brand.name}</Sans>
              <Sans size="2" color="black50">
                {product.name}
              </Sans>
              {!!variantSize && (
                <Sans size="2" color="black50">
                  Size {variantSize}
                </Sans>
              )}
            </Box>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            {!!imageURL && (
              <FadeInImage
                style={{ height: sectionHeight, width: 170 }}
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

const ReservationItemContainer = styled(Box)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  height: 210px;
`
