import React from "react"

import { chunk } from "lodash"
import { Box, FadeInImage, Flex, Sans, Spacer } from "App/Components"
import { TouchableWithoutFeedback, ScrollView } from "react-native"
import * as Animatable from "react-native-animatable"
import { useTracking } from "react-tracking"
import { useNavigation } from "@react-navigation/native"
import { Schema as EventSchema } from "App/utils/track"

interface AccessoriesRailProps {
  title: string
  items: Array<{
    id: string
    slug: string
    name: string
    images: Array<any>
  }>
}

const tileAspectRatio = 120 / 169
const tileWidth = 169
export const AccessoriesRail: React.FC<AccessoriesRailProps> = ({ items, title }) => {
  const tracking = useTracking()
  const navigation = useNavigation()
  return (
    <Box pl={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between" pr={2}>
        <Sans size="4">{title}</Sans>
      </Flex>
      <Spacer mb={1} />
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {chunk(items, 2).map((rowGroup, index, arr) => (
            <Box key={index}>
              <Flex flexDirection="column">
                {rowGroup.map((item) => {
                  const uri = item?.images?.[0]?.url || ""
                  return (
                    <Animatable.View animation="fadeIn" duration={300} key={item.id}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          navigation.navigate("Product", { id: item.id, slug: item.slug, name: item.name })
                          tracking.trackEvent({
                            actionType: EventSchema.ActionTypes.Tap,
                          })
                        }}
                      >
                        <Box mr={0.5} mb={0.5} style={{ width: tileWidth * tileAspectRatio }} position="relative">
                          <FadeInImage
                            source={{ uri }}
                            style={{ width: tileWidth * tileAspectRatio , height: tileWidth * tileAspectRatio}}
                          />
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
