import { Handle, Flex, Box } from "App/Components"
import { NAV_HEIGHT, RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { Schema } from "App/Navigation"
import { BagView } from "App/Scenes/Bag/Bag"
import { space } from "App/utils"
import React, { useState, useEffect, useRef, useMemo } from "react"
import { Dimensions } from "react-native"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"
import { useNavigation } from "@react-navigation/native"
import { BrandsRail, FitPicCollection, HomeFooter, ProductsRail, TagsRail } from "./"
import { FitPicCollectionRef } from "./FitPicCollection"
import { AddPhotoButton } from "./AddPhotoButton"
import { Spinner } from "App/Components/Spinner"

const dimensions = Dimensions.get("window")

enum SectionType {
  BlogPosts = "BlogPosts",
  Products = "Products",
  Brands = "Brands",
  ArchivalProducts = "ArchivalProducts",
  SavedProducts = "SavedProducts",
  FitPics = "FitPics",
}

const sectionsFrom = (data: any) => {
  const sections = []
  if (data?.blogPosts) {
    sections.push({ type: SectionType.BlogPosts, results: data?.blogPosts })
  }
  if (data?.justAddedTops?.length) {
    sections.push({ type: SectionType.Products, results: data?.justAddedTops, title: "Just added tops" })
  }
  if (data?.homepage?.sections?.length) {
    sections.push(
      ...data?.homepage?.sections
        .map((section) => {
          switch (section.type) {
            case SectionType.Brands:
              return section
            case SectionType.Products:
              return section
          }
        })
        .filter(Boolean)
    )
  }
  if (data?.me?.savedItems?.length) {
    const results = data?.me?.savedItems?.map((item) => item?.productVariant?.product)
    sections.push({ type: SectionType.SavedProducts, title: "Saved for later", results })
  }
  if (data?.archivalProducts?.length) {
    sections.push({
      type: SectionType.ArchivalProducts,
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
    sections.push({ type: SectionType.Products, results: data?.justAddedBottoms, title: "Just added bottoms" })
  }
  if (data?.fitPics?.length) {
    sections.push({ type: SectionType.FitPics, results: data?.fitPics })
  }
  return sections
}

interface HomeBottomSheetProps {
  data: any
  fetchMoreFitPics: () => void
  isFetchingMoreFitPics: boolean
}

export const HomeBottomSheet: React.FC<HomeBottomSheetProps> = ({ data, fetchMoreFitPics, isFetchingMoreFitPics }) => {
  const [sections, setSections] = useState(sectionsFrom(data))
  const [flatListHeight, setFlatListHeight] = useState(0)
  const fitPicCollectionRef: React.MutableRefObject<FitPicCollectionRef> = useRef(null)
  let [addPhotoButtonVisible, setAddPhotoButtonVisible] = useState(false)
  const bottomSheetRef: React.MutableRefObject<ScrollBottomSheet<string>> = useRef(null)
  const navigation = useNavigation()
  const reservationFeedback = data?.reservationFeedback

  useEffect(() => setSections(sectionsFrom(data)), [data])

  const blogContentHeight = dimensions.width
  const snapPoint = 20

  const renderItem = (item) => {
    switch (item.type) {
      case SectionType.Brands:
        return <BrandsRail title={item.title} items={item.results} />
      case SectionType.ArchivalProducts:
        return <TagsRail title={item.title} items={item.results} tagData={item.tagData} />
      case SectionType.Products:
        return <ProductsRail title={item.title} items={item.results} />
      case SectionType.SavedProducts:
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
      case SectionType.FitPics:
        return (
          <Box>
            <FitPicCollection
              items={item.results}
              navigation={navigation}
              parentRef={bottomSheetRef}
              ref={fitPicCollectionRef}
            />
            {isFetchingMoreFitPics && (
              <Flex style={{ height: 40 }} flexDirection="row" justifyContent="center">
                <Spinner />
              </Flex>
            )}
          </Box>
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
        keyExtractor={(item: any, i) => item.type.toString() + i}
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
          if (fitPicCollectionRef?.current?.getLayout()) {
            const { y, height } = fitPicCollectionRef?.current?.getLayout()
            const minOffset = y - flatListHeight + 70
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
        onEndReached={() => {
          fetchMoreFitPics()
        }}
        ref={bottomSheetRef}
        animationConfig={{
          duration: 200,
        }}
      />
    )
  }, [sections, flatListHeight, isFetchingMoreFitPics])

  return (
    <>
      {content}
      <AddPhotoButton visible={addPhotoButtonVisible} />
    </>
  )
}
