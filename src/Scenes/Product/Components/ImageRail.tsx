import { Box } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import React from "react"
import { FlatList } from "react-native"
import styled from "styled-components/native"

export const ImageRail = ({ images }) => {
  return (
    <Box ml={2} mt={2}>
      <FlatList
        data={images}
        renderItem={({ item }) => {
          const imageURL = imageResize(item && item.url, "x-large")
          return (
            <Box mr={1}>
              <ImageContainer source={{ uri: imageURL }} />
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

const ImageContainer = styled(FadeInImage)`
  background: #f6f6f6;
  height: 400;
  width: 320;
`
