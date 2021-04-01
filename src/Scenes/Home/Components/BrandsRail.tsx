import { Box, Flex, Sans, Spacer } from "App/Components"
import { Schema } from "App/utils/track"
import { chunk } from "lodash"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useTracking } from "react-tracking"
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
          <TouchableOpacity
            onPress={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.BrandTapped,
                actionType: Schema.ActionTypes.Tap,
                brandID: brand?.id,
                brandSlug: brand?.slug,
                brandName: brand?.name,
              })
              navigation.navigate("Brand", { id: brand.id, slug: brand.slug, name: brand.name })
            }}
          >
            <Sans size="5" style={{ textDecorationLine: "underline" }}>
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
        <Sans size="4">{title}</Sans>
        <TouchableOpacity
          onPress={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames.ViewAllBrandsTapped,
              actionType: Schema.ActionTypes.Tap,
            })
            navigation.navigate("Brands")
          }}
        >
          <Sans size="4" style={{ textDecorationLine: "underline" }}>
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
