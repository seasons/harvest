import { Box, FadeInImage, Flex, Sans, Spacer } from "App/Components"
import { Schema } from "App/utils/track"
import { chunk } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import * as Animatable from "react-native-animatable"
import { ScrollView } from "react-native-gesture-handler"
import { useTracking } from "react-tracking"

import { useNavigation } from "@react-navigation/native"

interface TagData {
  title: string
  tag: string
  description: string
}

interface TagsRailProps {
  items: any
  title?: string
  tagData: TagData
}

const ARCHIVAL_PRODUCT_RATIO = 132 / 104
const slideWidth = 104

export const TagsRail: React.FC<TagsRailProps> = ({ items, title, tagData }) => {
  const [rowGroups, createRowGroups] = useState([])
  const navigation = useNavigation()
  const tracking = useTracking()

  useEffect(() => {
    const rows = chunk(items, 6)
    createRowGroups(rows)
  }, [])

  const row = (rowGroup) => {
    return rowGroup.map((item) => {
      const uri = item?.images?.[0]?.url || ""
      return (
        <Animatable.View animation="fadeIn" duration={300} key={item.id}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Product", { id: item.id, slug: item.slug, name: item.name })}
          >
            <Box mr={0.5} style={{ width: slideWidth }}>
              <FadeInImage
                source={{ uri }}
                style={{ width: slideWidth, height: slideWidth * ARCHIVAL_PRODUCT_RATIO }}
              />
            </Box>
          </TouchableWithoutFeedback>
        </Animatable.View>
      )
    })
  }

  return (
    <Box pl={2} mb={3}>
      <Flex flexDirection="row" justifyContent="space-between" pr={2}>
        <Sans size="1">{title}</Sans>
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.ViewAllProductsByTagsTapped,
              actionType: Schema.ActionTypes.Tap,
              tag: tagData.tag,
            })
            navigation.navigate("Tag", { tagData })
          }}
        >
          <Sans size="1" style={{ textDecorationLine: "underline" }}>
            View all
          </Sans>
        </TouchableOpacity>
      </Flex>
      <Spacer mb={1} />
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Flex flexDirection="column">
            {rowGroups.map((rowItem, index) => {
              return (
                <Box key={index}>
                  <Flex flexDirection="row">{row(rowItem)}</Flex>
                  <Spacer mb={index !== rowGroups.length - 1 ? 0.5 : 0} />
                </Box>
              )
            })}
          </Flex>
        </ScrollView>
      </Box>
    </Box>
  )
}
