import { Box, Flex, Sans } from "App/Components"
import React from "react"
import { Text } from "react-native"
import { get } from "lodash"
import styled from "styled-components/native"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"

export const CurrentRotationItem = ({ physicalProduct }) => {
  const productVariant = physicalProduct.productVariant
  const product = productVariant && productVariant.product

  if (!product) {
    return null
  }

  const imageURL = imageResize(get(product, "images[0].url"), "medium")

  return (
    <Container key={product.id}>
      <Flex flexDirection="row">
        <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
          <Box p={2}>
            <Sans size="2">{product.brand.name}.</Sans>
            <Sans size="2" color="gray">
              {product.name}.
            </Sans>
            <Sans size="2" color="gray">
              Size {productVariant.size}
            </Sans>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <ImageContainer resizeMode="contain" source={{ uri: imageURL }} />
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  height: 370;
  border-width: 1px;
  border-color: #e5e5e5;
  border-style: solid;
  border-radius: 20;
`

const ImageContainer = styled(FadeInImage)`
  height: 200;
  width: 100%;
  background: #f2f2f2;
`
