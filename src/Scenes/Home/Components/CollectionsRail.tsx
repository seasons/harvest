import { Box, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { space } from "App/Utils"
import get from "lodash/get"
import React from "react"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

const cardWidth = 240

export const CollectionsRail = ({ items, navigation }) => {
  return (
    <Box pl={2}>
      <FlatList
        data={items}
        renderItem={({ item }) => {
          const image = get(item, "images[0].url")
          const id = get(item, "id")
          const resizedImage = imageResize(image, "x-large")
          return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Collection", { id })}>
              <Box mr={2}>
                <ImageContainer source={{ uri: resizedImage }} />
              </Box>
            </TouchableWithoutFeedback>
          )
        }}
        keyExtractor={({ id }) => id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <Spacer mb={4} />
    </Box>
  )
}

const ImageContainer = styled(FadeInImage)`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 288;
`
