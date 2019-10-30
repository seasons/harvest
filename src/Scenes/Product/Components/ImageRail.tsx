import React from "react"
import { Box } from "App/Components"
import { FlatList } from "react-native"
import { styled } from "App/Components/platform/primitives"
import { imageResize } from "App/helpers/imageResize"

export const ImageRail = ({ images }) => {
  return (
    <Box ml={2}>
      <FlatList
        data={images}
        renderItem={({ item }) => {
          const imageURL = imageResize(item && item.url, "x-large")
          return (
            <Box mr={1}>
              <ImageContainer source={{ uri: imageURL }}></ImageContainer>
            </Box>
          )
        }}
        keyExtractor={item => {
          const itemID = item && item.id
          return itemID
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </Box>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
