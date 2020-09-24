import { Box, Flex } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import React, { useState } from "react"
import { FlatList } from "react-native"
import styled from "styled-components/native"
import { GetProduct_products } from "App/generated/GetProduct"
import { Schema, useTracking } from "App/utils/track"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"

export const ImageRail: React.FC<{
  height?: number
  images: GetProduct_products["largeImages"]
  imageWidth?: number
  showPageDots: Boolean
  TextComponent?: React.ComponentType
}> = ({ height, imageWidth = 320, images, showPageDots, TextComponent }) => {
  const tracking = useTracking()
  const [currentPage, setCurrentPage] = useState(1)

  const onScroll = (e) => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.x / imageWidth + 1)

    if (newPageNum !== currentPage) {
      tracking.trackEvent({
        actionName: Schema.ActionNames.CarouselSwiped,
        actionType: Schema.ActionTypes.Swipe,
        slideIndex: newPageNum,
      })
      setCurrentPage(newPageNum)
    }
  }

  const imageHeight = height || imageWidth * PRODUCT_ASPECT_RATIO

  return (
    <Box>
      <FlatList
        data={images}
        renderItem={({ item }) => {
          return (
            <Box mr={images?.length > 1 ? 0.5 : 0}>
              <ImageContainer height={imageHeight} imageWidth={imageWidth} source={{ uri: item?.url || "" }} />
            </Box>
          )
        }}
        onScroll={onScroll}
        keyExtractor={(item) => {
          const itemID = item && item.url
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
                {images?.length > 1 &&
                  images?.map((_, i) => {
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

const ImageContainer = styled(FadeInImage)<{ imageWidth: number }>`
  background: #f6f6f6;
  height: ${(props) => props.height};
  width: ${(props) => props.imageWidth};
`
