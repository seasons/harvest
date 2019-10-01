import React from "react"
import { Box, Sans } from "App/Components"
import { FlatList } from "react-native"
import { styled } from "Components/platform/primitives"

interface JustAddedRailProps {
  items: any
}

export const JustAddedRail: React.FC<JustAddedRailProps> = ({ items }) => {
  return (
    <Box my={2}>
      <Sans size="2">Just Added</Sans>
      <Box mt={2}>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <Box mr={2}>
                <ImageContainer source={{ uri: item.imageUrl }}></ImageContainer>
                <Sans size="2" color="gray">
                  {item.brandName}
                </Sans>
                <Sans size="2">{item.productName}</Sans>
                <Sans size="2">{item.price}</Sans>
              </Box>
            )
          }}
          keyExtractor={({ colorway }) => colorway.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </Box>
    </Box>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
