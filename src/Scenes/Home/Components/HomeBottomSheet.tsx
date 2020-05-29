import React, { useState, useEffect, useRef } from "react"
import { Box, Handle, Spacer } from "App/Components"
import { color, space } from "App/utils"
import { FlatList } from "react-native-gesture-handler"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import { HomeFooter, BrandsRail, ProductsRail, TagsRail } from "./"
import { PRODUCT_ASPECT_RATIO, NAV_HEIGHT, RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { useNavigation } from "@react-navigation/native"
import { Schema } from "App/Navigation"
import { BagView } from "App/Scenes/Bag/Bag"
import BottomSheet from "reanimated-bottom-sheet"
import { useSafeArea } from "react-native-safe-area-context"

export const HomeBottomSheet = ({ data }) => {
  const [sections, setSections] = useState([])
  const bottomSheet = useRef(null)
  const insets = useSafeArea()
  const navigation = useNavigation()
  useEffect(() => {
    const sections = []
    if (data?.blogPosts) {
      sections.push({ type: "BlogPosts", results: data?.blogPosts })
    }
    if (data?.justAddedTops?.length) {
      sections.push({ type: "Products", results: data?.justAddedTops, title: "Just added tops" })
    }
    if (data?.homepage?.sections?.length) {
      sections.push(...data?.homepage?.sections)
    }
    if (data?.me?.savedItems?.length) {
      const results = data?.me?.savedItems?.map((item) => item?.productVariant?.product)
      sections.push({ type: "SavedProducts", title: "Saved for later", results })
    }
    if (data?.archivalProducts?.length) {
      sections.push({
        type: "ArchivalProducts",
        tagData: {
          tag: "Vintage",
          title: "Archives",
          description:
            "Great clothes are great clothes and we believe the past still lends itself to dressing for the now. What archive items lack in newness, they make up for by way of history. Through the Seasons archival section, we hope to add unique history and vibrance to our catalog, made possible by yesterday’s clothes.\n\nHere you’ll find garments celebrating historic eras of fashion, music, film, media and beyond. From 80s concert merchandise to early 2000s runway pieces, the archive section encompasses a unique field of textile designs, production styles and comfortable wear that can bring style and biography to any outfit or wardrobe.",
        },
        title: "Just added archival",
        results: data?.archivalProducts,
      })
    }
    if (data?.justAddedBottoms?.length) {
      sections.push({ type: "Products", results: data?.justAddedBottoms, title: "Just added bottoms" })
    }
    setSections(sections)
  }, [data])

  const dimensions = Dimensions.get("window")
  const blogContentHeight = dimensions.width * PRODUCT_ASPECT_RATIO
  const snapPoint = dimensions.height - blogContentHeight - NAV_HEIGHT

  const renderItem = (item) => {
    switch (item.type) {
      case "Brands":
        return <BrandsRail title={item.title} items={item.results} />
      case "ArchivalProducts":
        return <TagsRail title={item.title} items={item.results} tagData={item.tagData} />
      case "Products":
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

  console.log("data", data)

  const bottomSheetContent = () => {
    const reservationFeedback = data?.reservationFeedback

    return (
      <Box style={{ backgroundColor: color("white100") }}>
        <TouchableWithoutFeedback
          onPress={() => {
            // FIXME: Add snapTo to different position
            return null
          }}
        >
          <Handle style={{ marginTop: space(2) }} backgroundColor="black10" />
        </TouchableWithoutFeedback>
        <Spacer mb={2} />
        <FlatList
          data={sections}
          onScroll={(event) => {
            const y = event.nativeEvent.contentOffset.y
            const thresholdTop = -10
            const thresholdBottom = 0

            if (y < thresholdTop) {
              bottomSheet.current.snapTo(1)
            } else if (y > thresholdBottom) {
              bottomSheet.current.snapTo(0)
            }
          }}
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

  return (
    <BottomSheet
      ref={bottomSheet}
      borderRadius={28}
      snapPoints={[dimensions.height - NAV_HEIGHT - insets.top, snapPoint]}
      initialSnap={1}
      renderContent={bottomSheetContent}
    />
  )
}
