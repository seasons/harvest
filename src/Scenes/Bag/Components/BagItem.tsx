import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Loader } from "App/Components/Loader"
import { imageResize } from "App/helpers/imageResize"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { Text, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { useQuery } from "@apollo/react-hooks"

const GET_PRODUCT = gql`
  query GetProduct($productId: ID!, $variantId: ID!) {
    product(where: { id: $productId }) {
      name
      id
      modelSize
      brand {
        name
      }
      images
      variants(where: { id: $variantId }) {
        id
        size
      }
    }
  }
`

export const BagItem = ({ bagItem, index, sectionHeight, removeItemFromBag, showRemoveButton = true }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: bagItem.productID,
      variantId: bagItem.variantID,
    },
  })

  if (loading || !data) {
    return <BagItemLoader />
  }

  if (error) {
    console.error("error: ", error)
  }

  const product = data && data.product

  if (!product) {
    return null
  }

  const imageURL = imageResize(get(product, "images[0].url"), "medium")
  const size = get(data, "product.variants[0].size")

  return (
    <Box py={2} key={product.id} style={{ height: sectionHeight }}>
      <Flex flexDirection="row" style={{ flex: 1 }}>
        <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
          <Box>
            <Sans size="3">{index + 1}.</Sans>
            <Sans size="2">{product.brand.name}.</Sans>
            <Sans size="2" color="gray">
              {product.name}.
            </Sans>
          </Box>
          <Box>
            <Text>
              <Sans size="2" color="gray">
                Size {size} {showRemoveButton && ` | `}
              </Sans>

              {showRemoveButton && (
                <>
                  <TouchableWithoutFeedback onPress={() => removeItemFromBag(bagItem)}>
                    <Sans size="2" color="blue">
                      Remove
                    </Sans>
                  </TouchableWithoutFeedback>
                </>
              )}
            </Text>
          </Box>
        </Flex>
        <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
          <ImageContainer
            style={{ height: sectionHeight, width: 160 }}
            resizeMode="contain"
            source={{ uri: imageURL }}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

const ImageContainer = styled(FadeInImage)`
  height: 200;
  background: #f6f6f6;
`

const BagItemLoader = () => {
  return (
    <ContentLoader height={200} primaryColor="#f6f6f6">
      <Rect x="0" y="20" width="20" height="20" />
      <Rect x="0" y="62" width="80" height="18" />
      <Rect x="0" y="87" width="130" height="18" />
      <Rect x="0" y="112" width="90" height="18" />
      <Rect x="0" y="162" width="90" height="20" />
      <Rect x="175" y="0" width="160" height="200" />
    </ContentLoader>
  )
}
