import { Handle } from "App/Components"
import { NAV_HEIGHT, RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { Schema } from "App/Navigation"
import { BagView } from "App/Scenes/Bag/Bag"
import { space } from "App/utils"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { Easing } from "react-native-reanimated"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"

import { useNavigation } from "@react-navigation/native"

import { BrandsRail, HomeFooter, ProductsRail, TagsRail } from "./"

const dimensions = Dimensions.get("window")

export const HomeBottomSheet = ({ data }) => {
  const [sections, setSections] = useState([])
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
  const snapPoint = 20

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

  const reservationFeedback = data?.reservationFeedback

  return (
    <ScrollBottomSheet<string>
      componentType="FlatList"
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: 25,
      }}
      snapPoints={[snapPoint, dimensions.height - blogContentHeight - NAV_HEIGHT]}
      initialSnapIndex={1}
      renderHandle={() => <Handle style={{ marginTop: space(2), marginBottom: space(1) }} backgroundColor="black10" />}
      data={sections}
      renderItem={({ item }) => renderItem(item)}
      ListFooterComponent={() => (
        <HomeFooter
          navigation={navigation}
          bottom={reservationFeedback && reservationFeedback.rating ? RESERVATION_FEEDBACK_REMINDER_HEIGHT : 0}
        />
      )}
      animationConfig={{
        duration: 200,
      }}
    />
  )
}
