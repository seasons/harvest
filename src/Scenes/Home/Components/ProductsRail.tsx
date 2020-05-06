import React, { useState } from "react"
import { Box, Sans, Spacer, VariantSizes, Flex } from "App/Components"
import { FlatList, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from "react-native"
import { space } from "App/utils"
import * as Animatable from "react-native-animatable"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Homepage_homepage_sections_results_Product, Homepage_homepage_sections_results } from "App/generated/Homepage"
import { useTracking, Schema } from "App/utils/track"
import { useNavigation } from "@react-navigation/native"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"

export const ProductsRail: React.FC<{
  items: Homepage_homepage_sections_results[]
  title?: string
  onViewAll?: () => void
  large?: boolean
}> = ({ items, title, large, onViewAll }) => {
  const navigation = useNavigation()
  const [currentPage, setCurrentPage] = useState(1)
  const tracking = useTracking()
  let slideWidth = 144

  if (large) {
    const maxWidth = Dimensions.get("window").width - 96
    slideWidth = maxWidth < 280 ? maxWidth : 280
  }

  const onScroll = (e) => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.x / slideWidth + 1)

    if (newPageNum !== currentPage) {
      tracking.trackEvent({
        actionName: Schema.ActionNames.CarouselSwiped,
        actionType: Schema.ActionTypes.Swipe,
        slideIndex: newPageNum,
        contextModule: title,
      })
      setCurrentPage(newPageNum)
    }
  }

  return (
    <Box mb={3} pl={2}>
      <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
        <Sans size="1">{title}</Sans>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Box px={2}>
              <Sans size="1" style={{ textDecorationLine: "underline" }}>
                View all
              </Sans>
            </Box>
          </TouchableOpacity>
        )}
      </Flex>
      <Spacer mt={1} />
      <FlatList
        data={items}
        renderItem={({ item }: { item: Homepage_homepage_sections_results_Product; index: number }) => {
          const image = item.images && item.images.length && item.images[0]
          const resizedImage = image && imageResize(image.url, large ? "large" : "medium")
          const brandName = item.brand && item.brand.name
          return (
            <Animatable.View animation="fadeIn" duration={300}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Product", { id: item.id, slug: item.slug })}
              >
                <Box mr={0.5} style={{ width: slideWidth }}>
                  <FadeInImage
                    source={{ uri: resizedImage }}
                    style={{ width: slideWidth, height: slideWidth * PRODUCT_ASPECT_RATIO }}
                  />
                  <Spacer mb={0.5} />
                  {!!brandName && <Sans size="0">{brandName}</Sans>}
                  {item.variants && <VariantSizes size="0" variants={item.variants} />}
                </Box>
              </TouchableWithoutFeedback>
            </Animatable.View>
          )
        }}
        keyExtractor={(item: Homepage_homepage_sections_results_Product, index: number) => item.id + index}
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={onScroll}
        overScrollMode="always"
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={299}
        directionalLockEnabled={true}
        snapToInterval={slideWidth + space(0.5)}
      />
    </Box>
  )
}
