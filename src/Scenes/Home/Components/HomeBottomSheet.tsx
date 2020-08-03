import { Handle } from "App/Components"
import { NAV_HEIGHT, RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { Schema } from "App/Navigation"
import { BagView } from "App/Scenes/Bag/Bag"
import { space } from "App/utils"
import React, { useState, useEffect, useRef, useMemo } from "react"
import { Dimensions } from "react-native"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"
import { useNavigation } from "@react-navigation/native"
import { BrandsRail, CommunityStyleCollection, HomeFooter, ProductsRail, TagsRail } from "./"
import { CommunityStyleCollectionRef } from "./CommunityStyleCollection"
import { AddPhotoButton } from "./AddPhotoButton"

const dimensions = Dimensions.get("window")

export const HomeBottomSheet = ({ data }) => {
  const [sections, setSections] = useState([])
  const [flatListHeight, setFlatListHeight] = useState(0)
  const communityStylesRef: React.MutableRefObject<CommunityStyleCollectionRef> = useRef(null)
  let [addPhotoButtonVisible, setAddPhotoButtonVisible] = useState(false)
  const bottomSheetRef: React.MutableRefObject<ScrollBottomSheet<string>> = useRef(null)
  const navigation = useNavigation()
  const reservationFeedback = data?.reservationFeedback

  useEffect(() => {
    const sections = []
    if (data?.blogPosts) {
      sections.push({ type: "BlogPosts", results: data?.blogPosts })
    }
    if (data?.justAddedTops?.length) {
      sections.push({ type: "Products", results: data?.justAddedTops, title: "Just added tops" })
    }
    if (data?.homepage?.sections?.length) {
      sections.push(
        ...data?.homepage?.sections
          .map((section) => {
            switch (section.type) {
              case "Brands":
                return section
              case "Products":
                return section
            }
          })
          .filter((s) => s)
      )
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

    sections.push({ type: "CommunityStyle", results: [] })
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
      case "CommunityStyle":
        return (
          <CommunityStyleCollection
            items={[]}
            navigation={navigation}
            parentRef={bottomSheetRef}
            ref={communityStylesRef}
          />
        )
    }
  }

  const content = useMemo(() => {
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
        renderHandle={() => (
          <Handle style={{ marginTop: space(2), marginBottom: space(1) }} backgroundColor="black10" />
        )}
        keyExtractor={(item: any, i) => item.type + i}
        data={sections}
        renderItem={({ item }) => renderItem(item)}
        ListFooterComponent={() => (
          <HomeFooter
            navigation={navigation}
            bottom={reservationFeedback && reservationFeedback.rating ? RESERVATION_FEEDBACK_REMINDER_HEIGHT : 0}
          />
        )}
        onScroll={(event) => {
          const offset = event.nativeEvent.contentOffset.y
          if (communityStylesRef?.current?.getLayout()) {
            const { y, height } = communityStylesRef?.current?.getLayout()
            const minOffset = y - flatListHeight + 150
            const maxOffset = y - flatListHeight + height + 50
            const show = minOffset < offset && offset < maxOffset
            if (addPhotoButtonVisible !== show) {
              addPhotoButtonVisible = show
              setAddPhotoButtonVisible(show)
            }
          }
        }}
        onLayout={(e) => {
          if (!flatListHeight) {
            setFlatListHeight(e.nativeEvent.layout.height)
          }
        }}
        ref={bottomSheetRef}
        animationConfig={{
          duration: 200,
        }}
      />
    )
  }, [sections, flatListHeight])

  return (
    <>
      {content}
      <AddPhotoButton visible={addPhotoButtonVisible} />
    </>
  )
}
