import React from "react"

import { Schema } from "App/Navigation"
import { chunk } from "lodash"
import { Box, FadeInImage, Flex, Sans, Spacer } from "App/Components"
import { TouchableOpacity, TouchableWithoutFeedback, ScrollView } from "react-native"
import * as Animatable from "react-native-animatable"
import { useTracking } from "react-tracking"
import { useNavigation } from "@react-navigation/native"
import { Schema as EventSchema } from "App/utils/track"

interface CategoriesRailProps {
  title: string
  items: Array<{
    id: string
    slug: string
    name: string
    images: Array<any>
  }>
}

const tileAspectRatio = 185 / 230
const tileWidth = 230

const categories = [
  {
    name: "Shirts",
    slug: "shirts",
    image: "https://seasons-s3.imgix.net/categories/Category-Shirts.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
  {
    name: "Shorts",
    slug: "shorts",
    image: "https://seasons-s3.imgix.net/categories/Category-Shorts.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
  {
    name: "Pants",
    slug: "pants",
    image: "https://seasons-s3.imgix.net/categories/Category-Pants.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
  {
    name: "Tees",
    slug: "tees",
    image: "https://seasons-s3.imgix.net/categories/Category-Tees.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
  {
    name: "Jackets",
    slug: "jackets",
    image: "https://seasons-s3.imgix.net/categories/Category-Jackets.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
  {
    name: "Knits",
    slug: "knits",
    image: "https://seasons-s3.imgix.net/categories/Category-Knits.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image:
      "https://seasons-s3.imgix.net/categories/Category-Accessories.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
  {
    name: "Hoodies & Sweatshirts",
    slug: "hoodies-and-sweatshirts",
    image: "https://seasons-s3.imgix.net/categories/Category-Hoodies.jpg?w=576&fit=clip&retina=true&fm=webp&cs=srgb",
  },
]

export const CategoriesRail: React.FC<CategoriesRailProps> = () => {
  const tracking = useTracking()
  const navigation = useNavigation()

  return (
    <Box pl={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between" pr={2}>
        <Sans size="4">Discover</Sans>
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: EventSchema.ActionNames.ViewAllCategoriesTapped,
              actionType: EventSchema.ActionTypes.Tap,
            })
            navigation.navigate(Schema.StackNames.BrowseStack, {
              screen: Schema.PageNames.Browse,
              params: { categorySlug: "all" },
            })
          }}
        >
          <Sans size="4" style={{ textDecorationLine: "underline" }}>
            See all
          </Sans>
        </TouchableOpacity>
      </Flex>
      <Spacer mb={1} />
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {chunk(categories, 2).map((rowGroup, index, arr) => (
            <Box key={index}>
              <Flex flexDirection="column">
                {rowGroup.map((item, index) => {
                  return (
                    <Animatable.View animation="fadeIn" duration={300} key={index}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          navigation.navigate(Schema.StackNames.BrowseStack, {
                            screen: Schema.PageNames.Browse,
                            params: {
                              categorySlug: item.slug,
                            },
                          })
                        }}
                      >
                        <Box mr={0.5} mb={0.5} style={{ width: tileWidth }} position="relative">
                          <FadeInImage
                            source={{ uri: item.image }}
                            style={{ width: tileWidth, height: tileWidth * tileAspectRatio }}
                            radius={6}
                          />
                          <Box position="absolute" bottom="0" left="0" p={2}>
                            <Sans size="3">{item.name}</Sans>
                          </Box>
                        </Box>
                      </TouchableWithoutFeedback>
                    </Animatable.View>
                  )
                })}
              </Flex>
              <Spacer mb={index !== arr.length - 1 ? 0.5 : 0} />
            </Box>
          ))}
        </ScrollView>
      </Box>
    </Box>
  )
}
