import React, { useState, useEffect } from "react"
import { Box, Handle } from "App/Components"
import { color, space } from "App/utils"
import { FlatList, Dimensions } from "react-native"
import { HomeFooter, BrandsRail, ProductsRail } from "./"
import { PRODUCT_ASPECT_RATIO, NAV_HEIGHT, RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { useNavigation } from "@react-navigation/native"
import { Schema } from "App/Navigation"
import { BagView } from "App/Scenes/Bag/Bag"
import BottomSheet from "reanimated-bottom-sheet"
import Animated from "react-native-reanimated"

export const HomeBottomSheet = ({ data }) => {
  const [sections, setSections] = useState([])
  const navigation = useNavigation()
  useEffect(() => {
    const sections = []
    if (data?.homepage?.sections?.length) {
      if (data?.blogPosts) {
        sections.push({ type: "BlogPosts", results: data?.blogPosts })
      }
      const dataSections = data.homepage.sections.filter((section) => section?.results?.length)
      if (data?.me?.savedItems?.length) {
        const results = data?.me?.savedItems?.map((item) => item?.productVariant?.product)
        dataSections.splice(4, 0, { type: "SavedProducts", title: "Saved for later", results })
      }
      sections.push(...dataSections)
      setSections(sections)
    }
  }, [data])

  const dimensions = Dimensions.get("window")
  const blogContentHeight = dimensions.width * PRODUCT_ASPECT_RATIO
  const snapPoint = dimensions.height - blogContentHeight - NAV_HEIGHT

  const renderItem = (item) => {
    switch (item.type) {
      case "Brands":
        return <BrandsRail title={item.title} items={item.results} />
      case "Products":
      case "HomepageProductRails":
        return <ProductsRail title={item.title} items={item.results} />
      case "SavedProducts":
        return (
          <ProductsRail
            large
            title={item.title}
            items={item.results}
            onViewAll={() => {
              navigation.navigate(Schema.StackNames.BagStack, {
                screen: Schema.PageNames.Bag,
                params: { tab: BagView.Saved },
              })
            }}
          />
        )
    }
  }

  const bottomSheetContent = () => {
    const reservationFeedback = data?.reservationFeedback

    return (
      <Box style={{ backgroundColor: color("white100") }}>
        <Handle style={{ marginTop: space(2) }} backgroundColor="black10" />
        <FlatList
          data={sections}
          scrollEnabled={false}
          keyExtractor={(item, index) => {
            return item.type + index
          }}
          renderItem={({ item }) => <Box>{renderItem(item)}</Box>}
          ListFooterComponent={() => (
            <HomeFooter
              navigation={navigation}
              bottom={reservationFeedback && reservationFeedback.rating ? RESERVATION_FEEDBACK_REMINDER_HEIGHT : 0}
            />
          )}
        />
      </Box>
    )
  }

  // const sheetPosition = new Animated.Value(1)

  return (
    <BottomSheet
      // callbackNode={sheetPosition}
      enabledBottomClamp
      enabledInnerScrolling
      borderRadius={28}
      snapPoints={[dimensions.height - NAV_HEIGHT - space(2), snapPoint]}
      initialSnap={1}
      renderContent={bottomSheetContent}
    />
  )
}
