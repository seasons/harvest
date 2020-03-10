import React from "react"
import { Box, Sans, Spacer, VariantSizes } from "App/Components"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import { space } from "App/utils"
import * as Animatable from "react-native-animatable"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Homepage_homepage_sections_results_Product, Homepage_homepage_sections_results } from "App/generated/Homepage"

const slideWidth = 144

export const ProductsRail: React.FC<{
  items: Homepage_homepage_sections_results[]
  title?: string
  navigation: any
}> = ({ items, title, navigation }) => {
  return (
    <Box mb={3} pl={2}>
      <Sans size="1">{title}</Sans>
      <Spacer mt={1} />
      <FlatList
        data={items}
        renderItem={({ item }: { item: Homepage_homepage_sections_results_Product; index: number }) => {
          const image = item.images && item.images.length && item.images[0]
          const resizedImage = imageResize(image.url, "medium")
          const brandName = item.brand && item.brand.name
          return (
            <Animatable.View animation="fadeIn" duration={300}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: item.id })}>
                <Box mr={0.5} style={{ width: slideWidth }}>
                  <FadeInImage source={{ uri: resizedImage }} style={{ width: slideWidth, height: 180 }} />
                  <Spacer mb={0.5} />
                  {brandName && <Sans size="0">{brandName}</Sans>}
                  {item.variants && <VariantSizes size="0" variants={item.variants} />}
                </Box>
              </TouchableWithoutFeedback>
            </Animatable.View>
          )
        }}
        keyExtractor={(item: Homepage_homepage_sections_results_Product, index: number) => item.id + index}
        showsHorizontalScrollIndicator={false}
        horizontal
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
