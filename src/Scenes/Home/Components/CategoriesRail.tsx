import { Box, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import get from "lodash/get"
import React from "react"
import { ScrollView, TouchableWithoutFeedback } from "react-native"
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation"
import styled from "styled-components/native"

interface CategoriesRailProps {
  categories: any
  screenProps: any
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export const CategoriesRail: React.FC<CategoriesRailProps> = ({ categories, navigation, screenProps }) => {
  return (
    <Box pb={2} pl={2}>
      <Sans size="2">Categories</Sans>
      <Box mt={2}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => {
            const image = get(category, "image[0]", { url: "" })
            const resizedImage = imageResize(image.url, "small")
            return (
              <Box mr={1} key={category.id}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    screenProps.setBrowseFilter(category.slug)
                    // navigation.setParams({ categorySlug: category.slug })
                    navigation.navigate("Browse")
                  }}
                >
                  <Box>
                    <ImageContainer>
                      <FadeInImage source={{ uri: resizedImage }} style={{ height: 112, width: 92 }} />
                    </ImageContainer>
                    <Sans size="0" color="gray" mt={1} textAlign="center" style={{ width: 92 }}>
                      {category.name}
                    </Sans>
                  </Box>
                </TouchableWithoutFeedback>
              </Box>
            )
          })}
        </ScrollView>
      </Box>
    </Box>
  )
}

const ImageContainer = styled(Box)`
  background-color: #f6f6f6;
  height: 112;
  width: 92;
  border-radius: 46;
  overflow: hidden;
`
