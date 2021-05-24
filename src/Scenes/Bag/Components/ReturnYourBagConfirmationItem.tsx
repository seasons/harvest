import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import gql from "graphql-tag"
import React from "react"
import styled from "styled-components/native"

export const ReturnYourBagConfirmationItem_PhysicalProduct = gql`
  fragment ReturnYourBagConfirmationItem on PhysicalProduct {
    id
    seasonsUID
    inventoryStatus
    productStatus
    productVariant {
      id
      size
      product {
        id
        name
        retailPrice
        brand {
          id
          name
        }
        images(size: Thumb) {
          id
          url
        }
      }
    }
  }
`

export const ReturnYourBagConfirmationItem = ({ physicalProduct }) => {
  const product = physicalProduct?.productVariant?.product
  const variantToUse = physicalProduct.productVariant

  if (!product || !variantToUse) {
    return null
  }

  const imageURL = product?.images?.[0]?.url
  const variantSize = variantToUse?.displayLong?.toLowerCase()

  return (
    <Box key={product.id}>
      <ReservationItemContainer flexDirection="row">
        <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
          <Box>
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
      </ReservationItemContainer>
    </Box>
  )
}

const ReservationItemContainer = styled(Flex)`
  background: white;
  overflow: hidden;
  height: 210px;
`
