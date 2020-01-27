import { Box, Flex } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import React, { useState } from "react"
import { FlatList } from "react-native"
import styled from "styled-components/native"

const IMAGE_WIDTH = 320

export const ImageRail: React.FC<{
  images: React.ReactElement[]
  showPageDots: Boolean
  TextComponent?: React.ComponentType
}> = ({ images, showPageDots, TextComponent }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const onScroll = e => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.x / IMAGE_WIDTH + 1)

    if (newPageNum !== currentPage) {
      setCurrentPage(newPageNum)
    }
  }

  return (
    <Box>
      <FlatList
        data={images}
        renderItem={({ item }) => {
          const imageURL = imageResize(item && item.url, "x-large")
          return (
            <Box mr={0.5}>
              <ImageContainer source={{ uri: imageURL }} />
            </Box>
          )
        }}
        onScroll={onScroll}
        keyExtractor={item => {
          const itemID = item && item.id
          return itemID
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      {(showPageDots || !!TextComponent) && (
        <Box px={2} pt={2}>
          <Flex
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: showPageDots && !TextComponent ? "flex-end" : "space-between",
              alignItems: "center",
            }}
          >
            {!!TextComponent && <TextComponent />}
            {showPageDots && (
              <Flex style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                {images.map((_, i) => {
                  return (
                    <Box
                      key={i}
                      style={{
                        height: 8,
                        width: 8,
                        backgroundColor: currentPage - 1 === i ? "black" : "white",
                        marginLeft: 3,
                        borderColor: "black",
                        borderWidth: 1,
                      }}
                    />
                  )
                })}
              </Flex>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  )
}

const ImageContainer = styled(FadeInImage)`
  background: #f6f6f6;
  height: 400;
  width: ${IMAGE_WIDTH};
`
