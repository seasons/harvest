import React from "react"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { styled } from "Components/platform/primitives"
import { Box, Spacer } from "App/Components"
import { space } from "App/Utils"
import { imageResize } from "App/helpers/imageResize"
import get from "lodash/get"
import * as Animatable from "react-native-animatable"

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
            <Animatable.View animation="fadeIn" duration={300}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Collection", { id })}>
                <Box mr={2}>
                  <ImageContainer source={{ uri: resizedImage }} />
                </Box>
              </TouchableWithoutFeedback>
            </Animatable.View>
          )
        }}
        keyExtractor={({ id }) => id.toString()}
        showsHorizontalScrollIndicator={false}
        overScrollMode="always"
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={299}
        directionalLockEnabled={true}
        snapToInterval={cardWidth + space(1)}
        horizontal
      />
      <Spacer mb={4} />
    </Box>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 288;
`
