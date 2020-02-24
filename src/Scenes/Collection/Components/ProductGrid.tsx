import React from "react"
import { Flex, Box, Sans, Spacer } from "App/Components"
import get from "lodash/get"
import { imageResize } from "App/helpers/imageResize"
import { Image, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"

export const ProductGrid: React.FC<{
  products: any
  windowWidth: number
  navigation: any
}> = ({ products, windowWidth, navigation }) => {
  return (
    <Flex style={{ flex: 1 }} flexDirection="row" flexWrap="wrap">
      {products.map((product, index) => {
        const image = get(product, "images[0]")
        const resizedImage = imageResize(image.url, "medium")
        const containerStyles = index % 2 === 0 ? { marginRight: 5 } : { marginLeft: 5 }
        const width = windowWidth / 2 - 5
        return (
          <Flex style={{ width, ...containerStyles }} key={product.id}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
              <ImageContainer source={{ uri: resizedImage }} style={{ width, height: width * PRODUCT_ASPECT_RATIO }} />
              <Box py={2} pl={index % 2 === 0 ? 2 : 0}>
                <Sans size="0">{product.brand.name}</Sans>
                <Spacer mb={0.5} />
                <Sans size="0" color="gray">
                  {product.name}
                </Sans>
                <Spacer mb={0.5} />
                <Sans size="0" color="gray">
                  Retail ${product.retailPrice}
                </Sans>
              </Box>
            </TouchableWithoutFeedback>
          </Flex>
        )
      })}
    </Flex>
  )
}

const ImageContainer = styled(Image)`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
