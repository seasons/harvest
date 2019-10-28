import React from "react"
import { FlatList } from "react-native"
import { styled } from "Components/platform/primitives"
import { Box, Spacer } from "App/Components"
import { space } from "App/Utils"

const cardWidth = 240

export const HeroRail = ({ items, navigation }) => {
  return (
    <Box pl={2}>
      <FlatList
        data={items}
        renderItem={({ item }) => {
          return (
            <Box mr={2}>
              <ImageContainer source={{ uri: item.heroImageURL }}></ImageContainer>
            </Box>
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
      <Spacer mb={3} />
    </Box>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
