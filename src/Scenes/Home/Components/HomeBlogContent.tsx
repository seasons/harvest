import React, { useState } from "react"
import { Box, Flex, FadeInImage } from "App/Components"
import { LogoText, Sans } from "App/Components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { space } from "App/utils"
import styled from "styled-components/native"
import { FlatList, TouchableWithoutFeedback, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Schema } from "App/Navigation"
import { useTracking, Schema as TrackingSchema } from "App/utils/track"
import { FadeTop, FadeBottom } from "Assets/svgs"

const windowWidth = Dimensions.get("window").width
const slideHeight = windowWidth

export const HomeBlogContent = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const insets = useSafeAreaInsets()
  const tracking = useTracking()
  const navigation = useNavigation()

  const renderItem = ({ item }) => {
    const imageURL = !!item.imageURL && item.imageURL
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(Schema.PageNames.Webview, { uri: item?.url || "" })
        }}
      >
        <Box>
          <FadeInImage source={{ uri: imageURL }} style={{ width: windowWidth, height: slideHeight }} />
        </Box>
      </TouchableWithoutFeedback>
    )
  }

  const onScroll = (e) => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.y / slideHeight + 1)

    if (newPageNum !== currentPage) {
      tracking.trackEvent({
        actionName: TrackingSchema.ActionNames.CarouselSwiped,
        actionType: TrackingSchema.ActionTypes.Swipe,
        slideIndex: newPageNum,
      })
      setCurrentPage(newPageNum)
    }
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
        data={items}
        keyExtractor={(item, index) => item.id + index}
        renderItem={(item) => renderItem(item)}
      />
      <Overlay pt={insets.top + space(2)} pointerEvents="none">
        <Flex style={{ flex: 1 }} flexDirection="column" justifyContent="space-between" alignContent="center">
          <LogoText>SEASONS</LogoText>
          <Box p={2} pr={6}>
            <Sans size="5" color="white100">
              {items?.[currentPage - 1]?.name}
            </Sans>
            <Sans size="5" color="black25" style={{ textTransform: "capitalize" }}>
              {items?.[currentPage - 1]?.category}
            </Sans>
          </Box>
        </Flex>
        <IndexContainer>
          <Flex flexDirection="column" p={2}>
            {items.map((_item, index) => {
              return (
                <Box pt={1} key={index}>
                  <Sans color={currentPage === index + 1 ? "white100" : "black25"} size="4">
                    {index + 1}
                  </Sans>
                </Box>
              )
            })}
          </Flex>
        </IndexContainer>
        <FadeWrapper style={{ top: 0 }}>
          <FadeTop />
        </FadeWrapper>
        <FadeWrapper style={{ bottom: 0 }}>
          <FadeBottom />
        </FadeWrapper>
      </Overlay>
    </Wrapper>
  )
}

const FadeWrapper = styled(Box)`
  position: absolute;
  left: 0;
  z-index: -1;
  width: ${windowWidth};
`

const Wrapper = styled(Box)`
  height: ${slideHeight};
  overflow: hidden;
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
`

const IndexContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 0;
`
