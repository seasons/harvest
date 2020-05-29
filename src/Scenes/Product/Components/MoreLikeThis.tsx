import { Box, ProductGridItem, Sans, Spacer } from "App/Components"
import React from "react"
import { FlatList } from "react-native"
import styled from "styled-components/native"

export const MoreLikeThis = ({ products }) => {
  console.log("PRODUCTS: ", products)
  return (
    <>
      <Box p={2}>
        <Sans color="black" size="2">
          More like this
        </Sans>
        <Spacer mb={2} />
      </Box>
      <Box ml={2}>
        <FlatList
          data={products}
          renderItem={({ item, index }) => {
            return (
              <Box mr={1}>
                <ProductGridItem product={item} addLeftSpacing={false} showBrandName />
              </Box>
            )

            // const imageURL = item && item.images[0].url
            // return (
            //   <Box mr={1}>
            //     <ImageContainer source={{ uri: imageURL }}></ImageContainer>
            //   </Box>
            // )
          }}
          keyExtractor={(item) => {
            const itemID = item && item.id
            return itemID
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </Box>
    </>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
