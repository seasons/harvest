import React from "react"
import { FlatList } from "react-native"
import { styled } from "Components/platform/primitives"
import { Box } from "App/Components"

export const HeroRail = ({ items, navigation }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        return (
          <Box px={2}>
            <ImageContainer source={{ uri: item.url }}></ImageContainer>
          </Box>
        )
      }}
      keyExtractor={({ id }) => id.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
