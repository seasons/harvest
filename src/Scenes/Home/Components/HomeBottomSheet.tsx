import { Box, Handle, Spacer } from "App/Components"
import { NAV_HEIGHT, RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { Schema } from "App/Navigation"
import { BagView } from "App/Scenes/Bag/Bag"
import { color, space } from "App/utils"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import BottomSheet from "reanimated-bottom-sheet"

import { useNavigation } from "@react-navigation/native"

import { BrandsRail, HomeFooter, ProductsRail, TagsRail } from "./"

const dimensions = Dimensions.get("window")

export const HomeBottomSheet = ({ data }) => {
  const [sections, setSections] = useState([])
  const bottomSheet = useRef(null)
  const insets = useSafeArea()
  const navigation = useNavigation()

  useEffect(() => {
    const sections = []
    if (data?.blogPosts) {
      sections.push({ type: "BlogPosts", results: data?.blogPosts, height: 50 })
    }
    if (data?.justAddedTops?.length) {
      sections.push({ type: "Products", results: data?.justAddedTops, title: "Just added tops", height: 280 })
    }
    if (data?.homepage?.sections?.length) {
      sections.push(
        ...data?.homepage?.sections.map((section) => {
          switch (section.type) {
            case "Brands":
              return {
                ...section,
                height: 218,
              }
            case "Products":
              return {
                ...section,
                height: 280,
              }
            default:
              return { ...section, height: 0 }
          }
        })
      )
    }
    if (data?.me?.savedItems?.length) {
      const results = data?.me?.savedItems?.map((item) => item?.productVariant?.product)
      sections.push({ type: "SavedProducts", title: "Saved for later", results, height: 456 })
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
        height: 324,
      })
    }
    if (data?.justAddedBottoms?.length) {
      sections.push({ type: "Products", results: data?.justAddedBottoms, title: "Just added bottoms", height: 280 })
    }
    setSections(sections)
  }, [data])

  const blogContentHeight = dimensions.width
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

  const Content = () => {
    return (
      <Box my={2}>
        {sections.map((item, i) => {
          const sectionKey = item.type + i
          return <Box key={sectionKey}>{renderItem(item)}</Box>
        })}
      </Box>
    )
  }

  const bottomSheetContent = () => {
    const reservationFeedback = data?.reservationFeedback
    // Height of each sections combined + HomeFooter height
    const contentHeight = sections.map((a) => a.height).reduce((a, b) => a + b, 0) + 310
    return (
      <Box style={{ backgroundColor: color("white100"), height: contentHeight }}>
        <Handle style={{ marginTop: space(2) }} backgroundColor="black10" />
        <Spacer mb={2} />
        <Content />
        <Box>
          <HomeFooter
            navigation={navigation}
            bottom={reservationFeedback && reservationFeedback.rating ? RESERVATION_FEEDBACK_REMINDER_HEIGHT : 0}
          />
        </Box>
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
