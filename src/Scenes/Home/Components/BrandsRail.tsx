import React, { useState, useEffect } from "react"
import { Box, Sans, Flex, Spacer } from "App/Components"
import { TouchableOpacity, ScrollView } from "react-native"
import { chunk } from "lodash"
import { useTracking } from "react-tracking"
import { Schema } from "App/utils/track"
import { useNavigation } from "@react-navigation/native"

interface BrandsRailProps {
  items: any
  title?: string
}

export const BrandsRail: React.FC<BrandsRailProps> = ({ items, title }) => {
  const [rowGroups, createRowGroups] = useState([])
  const navigation = useNavigation()
  const tracking = useTracking()

  useEffect(() => {
    const rows = chunk(items, 5)
    createRowGroups(rows)
  }, [])

  const row = (rowGroup) => {
    return rowGroup.map((brand) => {
      return (
        <Flex flexDirection="row" key={brand.name}>
          <TouchableOpacity onPress={() => navigation.navigate("Brand", { id: brand.id, slug: brand.slug })}>
            <Sans size="2" style={{ textDecorationLine: "underline" }}>
              {brand.name}
            </Sans>
          </TouchableOpacity>
          <Spacer mr={2} />
        </Flex>
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
              actionName: Schema.ActionNames.ViewAllBrandsTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            navigation.navigate("Brands")
          }}
        >
          <Sans size="1" style={{ textDecorationLine: "underline" }}>
            View all
          </Sans>
        </TouchableOpacity>
      </Flex>
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Flex flexDirection="column">
            {rowGroups.map((rowItem, index) => {
              return (
                <Box key={index}>
                  <Spacer mb={1} />
                  <Flex flexDirection="row">{row(rowItem)}</Flex>
                </Box>
              )
            })}
          </Flex>
        </ScrollView>
      </Box>
    </Box>
  )
}
