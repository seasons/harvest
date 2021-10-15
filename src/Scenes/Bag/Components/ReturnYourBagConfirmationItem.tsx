import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import gql from "graphql-tag"
import React from "react"
import styled from "styled-components/native"

export const ReturnYourBagConfirmationItemFragment_PhysicalProduct = gql`
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

const itemHeight = 136

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
        <Flex flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
          {!!imageURL && (
            <FadeInImage
              style={{ height: itemHeight, width: itemHeight / PRODUCT_ASPECT_RATIO }}
              resizeMode="contain"
              source={{ uri: imageURL }}
            />
          )}
        </Flex>
        <Flex ml={2} flex={1} flexWrap="nowrap" flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
          <Box>
            <Sans size="3">{product.brand.name}</Sans>
            <Sans size="3" color="black50">
              {product.name}
            </Sans>
            {!!variantSize && (
              <Sans size="3" color="black50">
                Size {variantSize}
              </Sans>
            )}
          </Box>
        </Flex>
      </ReservationItemContainer>
    </Box>
  )
}

const ReservationItemContainer = styled(Flex)`
  background: white;
  overflow: hidden;
  height: ${itemHeight}px;
`
