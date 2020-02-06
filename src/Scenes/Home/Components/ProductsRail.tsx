import React, { useState } from "react"
import { Box, Sans, Button, Spacer, VariantSizes } from "App/Components"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"
import { space } from "App/Utils"
import { Dimensions } from "react-native"
import * as Animatable from "react-native-animatable"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Homepage_homepage_sections_results_Product, Homepage_homepage_sections_results } from "App/generated/Homepage"

const cardWidth = 240

export const ProductsRail: React.FC<{
  items: Homepage_homepage_sections_results[]
  title?: string
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}> = ({ items, title, navigation }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const onScroll = e => {
    const newPageNum = Math.round(e.nativeEvent.contentOffset.x / cardWidth + 1)

    if (newPageNum !== currentPage) {
      setCurrentPage(newPageNum)
    }
  }

  const negativeSpace = Math.round(Dimensions.get("window").width) - (cardWidth + 5)
  return (
    <Box mb={2} pl={2} style={{ position: "relative" }}>
      <Sans size="2">{title}</Sans>
      <Spacer mt={1} />
      <FlatList
        data={items}
        renderItem={({ item, index }: { item: Homepage_homepage_sections_results_Product; index: number }) => {
          const image = item.images && item.images.length && item.images[0]
          const resizedImage = imageResize(image.url, "medium")
          const brandName = item.brand && item.brand.name
          return (
            <Animatable.View animation="fadeIn" duration={300}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: item.id })}>
                <Box mr={0.5}>
                  <FadeInImage source={{ uri: resizedImage }} style={{ width: 144, height: 180 }} />
                  <Spacer mb={0.5} />
                  {brandName && <Sans size="0">{brandName}</Sans>}
                  {item.variants && <VariantSizes size="0" variants={item.variants} />}
                </Box>
              </TouchableWithoutFeedback>
              {index === items.length - 1 ? <Spacer mr={negativeSpace} /> : null}
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
        snapToInterval={cardWidth + space(1)}
      />
    </Box>
  )
}
