import React from "react"
import { Flex } from "App/Components"
import get from "lodash/get"
import { imageResize } from "App/helpers/imageResize"
import { Image } from "react-native"
import styled from "styled-components/native"

export const ProductGrid: React.FC<{ products: any }> = ({ products }) => {
  console.log("products", products)
  return (
    <Flex style={{ flex: 1 }}>
      {products.map((product, index) => {
        const image = get(product, "images[0].url")
        const resizedImage = imageResize(image, "medium")
        const styles = index % 2 === 0 ? { marginLeft: 5 } : { marginRight: 5 }
        return (
          <Flex style={{ flex: 2, ...styles }} key={product.id}>
            <ImageContainer source={{ uri: resizedImage }} />
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
