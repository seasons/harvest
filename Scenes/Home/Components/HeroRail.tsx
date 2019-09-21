import React from "react"
import { FlatList } from "react-native"
import { styled } from "../../../components/platform/primitives"
import { Box } from "../../../components"

export const HeroRail = ({ items }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        return (
          <Box mr={2}>
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
