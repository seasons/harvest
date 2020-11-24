import React from "react"

import { Schema } from "App/Navigation"
import { chunk } from "lodash"
import { Box, FadeInImage, Flex, Sans, Spacer } from "App/Components"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
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

const tileWidth = 169
const tileAspectRatio = 120 / 169

export const CategoriesRail: React.FC<CategoriesRailProps> = ({ items, title }) => {
  const tracking = useTracking()
  const navigation = useNavigation()
  return (
    <Box pl={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between" pr={2}>
        <Sans size="1">{title}</Sans>
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: EventSchema.ActionNames.ViewAllCategoriesTapped,
              actionType: EventSchema.ActionTypes.Tap,
            })
            navigation.navigate(Schema.PageNames.Browse)
          }}
        >
          <Sans size="1" style={{ textDecorationLine: "underline" }}>
            View all
          </Sans>
        </TouchableOpacity>
      </Flex>
      <Spacer mb={1} />
      <Box>
        {chunk(items, 2).map((rowGroup, index, arr) => (
          <Box key={index}>
            <Flex flexDirection="row">
              {rowGroup.map((item) => {
                const uri = item?.image?.[0]?.url || ""
                return (
                  <Animatable.View animation="fadeIn" duration={300} key={item.id}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        navigation.navigate(Schema.PageNames.Browse, {
                          categorySlug: item.slug,
                        })
                      }}
                    >
                      <Box mr={0.5} style={{ width: tileWidth }} position="relative">
                        <FadeInImage
                          source={{ uri }}
                          style={{ width: tileWidth, height: tileWidth * tileAspectRatio }}
                        />
                        <Box position="absolute" bottom="1" left="1">
                          <Sans size="0">{item.name}</Sans>
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
      </Box>
    </Box>
  )
}
