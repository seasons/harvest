import React from "react"
import { Box, FadeInImage } from "App/Components"
import { FlatList, Dimensions } from "react-native"
import { useTracking, Schema as TrackingSchema } from "App/utils/track"
import { color } from "App/utils"
import styled from "styled-components/native"

const windowWidth = Dimensions.get("window").width
const imageHeight = windowWidth

export const BrandPhotos = ({ images, currentImage, setCurrentImage }) => {
  const tracking = useTracking()

  const renderItem = ({ item }) => {
    return (
      <Box>
        <FadeInImage source={{ uri: item?.url || "" }} style={{ width: windowWidth, height: imageHeight }} />
      </Box>
    )
  }

  const onScroll = (e) => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.y / imageHeight + 1)

    if (newPageNum !== currentImage) {
      tracking.trackEvent({
        actionName: TrackingSchema.ActionNames.CarouselSwiped,
        actionType: TrackingSchema.ActionTypes.Swipe,
        slideIndex: newPageNum,
      })
      setCurrentImage(newPageNum)
    }
  }

  if (images.length === 0) {
    return <BlackSpacer />
  }

  return (
    <Wrapper>
      <FlatList
        pagingEnabled
        overScrollMode="always"
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={299}
        onScroll={onScroll}
        data={images}
        keyExtractor={(item, index) => item.id + index}
        renderItem={(item) => renderItem(item)}
      />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  height: ${imageHeight};
  overflow: hidden;
  background-color: ${color("white100")};
`

const BlackSpacer = styled(Box)`
  height: 125;
  width: 100%;
  background-color: ${color("black100")};
`
