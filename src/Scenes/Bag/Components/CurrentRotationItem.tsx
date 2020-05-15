import { Box, Flex, Sans } from "App/Components"
import React from "react"
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

  const imageURL = imageResize(get(product, "images[0].url"), "thumb")

  return (
    <Container key={product.id}>
      <Box p={2}>
        <Sans size="2">{product.brand.name}</Sans>
        <Sans size="2" color="gray">
          {product.name}
        </Sans>
        <Flex flexDirection="row">
          <Sans size="2" color="gray">
            Size {productVariant.size}
          </Sans>
          <Sans size="2" color="gray" style={{ marginLeft: "auto" }}>
            Retail ${product.retailPrice}
          </Sans>
        </Flex>
      </Box>
      <ImageContainer>
        <Image resizeMode="contain" source={{ uri: imageURL }} />
      </ImageContainer>
    </Container>
  )
}

const Container = styled(Box)`
  border-width: 1px;
  border-color: #e5e5e5;
  border-style: solid;
  border-radius: 20;
  overflow: hidden;
`

const ImageContainer = styled(Box)`
  border-top-color: #e5e5e5;
  border-style: solid;
  border-top-width: 1px;
`

const Image = styled(FadeInImage)`
  height: 260;
  width: 100%;
  background: #f6f6f6;
`
