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
    <Container m={2} key={product.id}>
      <Flex flexDirection="row" style={{ flex: 1 }}>
        <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
          <Box>
            <Sans size="2">{product.brand.name}.</Sans>
            <Sans size="2" color="gray">
              {product.name}.
            </Sans>
          </Box>
          <Box>
            <Text>
              <Sans size="2" color="gray">
                Size {productVariant.modelSize}
              </Sans>
            </Text>
          </Box>
        </Flex>
        <Flex>
          <ImageContainer resizeMode="contain" source={{ uri: imageURL }} />
        </Flex>
      </Flex>
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
