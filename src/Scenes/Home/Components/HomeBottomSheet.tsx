import { Box, Flex, Handle } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import { RESERVATION_FEEDBACK_REMINDER_HEIGHT } from "App/helpers/constants"
import { Schema } from "App/Navigation"
import { BagView } from "App/Scenes/Bag/Bag"
import { space } from "App/utils"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"
import { useNavigation } from "@react-navigation/native"
import { AddPhotoButton } from "./AddPhotoButton"
import { ProductsRail, CollectionsRail } from "@seasons/eclipse"
import { BrandsRail, CategoriesRail, FitPicCollection, HomeFooter, TagsRail } from "./"
import { FitPicCollectionRef } from "./FitPicCollection"
import { HomepageBanner } from "App/Components/HomepageBanner"

const dimensions = Dimensions.get("window")

enum SectionType {
  BlogPosts = "BlogPosts",
  Products = "Products",
  Brands = "Brands",
  ArchivalProducts = "ArchivalProducts",
  SavedProducts = "SavedProducts",
  FitPics = "FitPics",
  Categories = "Categories",
  ProductsByTag = "ProductsByTag",
  Collection = "Collection",
  Banner = "Banner",
  FeaturedCollections = "FeaturedCollections",
}

const sectionsFrom = (data: any, navigation) => {
  const sections = []
  if (data?.blogPosts) {
    sections.push({ type: SectionType.BlogPosts, results: data?.blogPosts })
  }

  const customerStatus = data?.me?.customer?.status
  const customerApprovedForBanner =
    (data?.banner?.properties?.requiredCustomerStatus?.length > 0 &&
      data?.banner?.properties?.requiredCustomerStatus?.includes(customerStatus)) ||
    !(data?.banner?.properties?.requiredCustomerStatus?.length > 0)
  if (customerApprovedForBanner && data?.banner?.properties?.published) {
    sections.push({
      type: SectionType.Banner,
      banner: data.banner,
    })
  }

  if (data?.justAddedOuterwear?.length) {
    sections.push({ type: SectionType.Products, results: data?.justAddedOuterwear, title: "Just added outerwear" })
  }
  if (data?.homepage?.sections?.length) {
    sections.push(
      ...data?.homepage?.sections
        .map((section) => {
          switch (section.type) {
            case SectionType.Brands:
              return section
          }
        })
        .filter(Boolean)
    )
  }
  if (data?.justAddedTops?.length) {
    sections.push({ type: SectionType.Products, results: data?.justAddedTops, title: "Just added tops" })
  }
  if (data?.homepage?.sections?.length) {
    sections.push(
      ...data?.homepage?.sections
        .map((section) => {
          switch (section.type) {
            case SectionType.Categories:
              return {
                ...section,
                results: section.results.map((item) => ({
                  ...item,
                  slug: item.slug === "hoodies" || item.slug === "sweatshirts" ? "hoodies-and-sweatshirts" : item.slug,
                })),
              }
          }
        })
        .filter(Boolean)
    )
  }
  if (data?.justAddedBottoms?.length) {
    sections.push({ type: SectionType.Products, results: data?.justAddedBottoms, title: "Just added bottoms" })
  }
  if (data?.featuredCollections?.length > 0) {
    sections.push({
      type: SectionType.FeaturedCollections,
      results: data?.featuredCollections,
      title: "Featured collections",
    })
  }
  if (data?.collections?.length > 0) {
    sections.push(
      ...data?.collections
        .map((section) => {
          return {
            type: SectionType.Collection,
            title: section.title,
            results: section.products,
            id: section.id,
            slug: section.slug,
          }
        })
        .filter(Boolean)
    )
  }

  if (data?.homepage?.sections?.length) {
    sections.push(
      ...data?.homepage?.sections
        .map((section) => {
          switch (section.type) {
            case SectionType.Products:
              return section
          }
        })
        .filter(Boolean)
    )
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

  if (data?.me?.savedItems?.length) {
    const results = data?.me?.savedItems?.map((item) => item?.productVariant?.product)
    sections.push({ type: SectionType.SavedProducts, title: "Saved for later", results })
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
  const navigation = useNavigation()
  const [sections, setSections] = useState(sectionsFrom(data, navigation))
  const insets = useSafeAreaInsets()
  const [flatListHeight, setFlatListHeight] = useState(0)
  const fitPicCollectionRef: React.MutableRefObject<FitPicCollectionRef> = useRef(null)
  let [addPhotoButtonVisible, setAddPhotoButtonVisible] = useState(false)
  const bottomSheetRef: React.MutableRefObject<ScrollBottomSheet<string>> = useRef(null)
  const reservationFeedback = data?.reservationFeedback

  useEffect(() => setSections(sectionsFrom(data, navigation)), [data, navigation])

  const blogContentHeight = dimensions.width
  const snapPoint = 0
  const secondSnapPoint = blogContentHeight - insets.top

  const renderItem = (item) => {
    switch (item.type) {
      case SectionType.Banner:
        return <HomepageBanner banner={item.banner} />
      case SectionType.Brands:
        return <BrandsRail title={item.title} items={item.results} />
      case SectionType.ArchivalProducts:
        return <TagsRail title={item.title} items={item.results} tagData={item.tagData} />
      case SectionType.Collection:
        return (
          <ProductsRail
            large
            title={item.title}
            items={item.results}
            onViewAll={() => {
              navigation.navigate(Schema.StackNames.HomeStack, {
                screen: Schema.PageNames.Collection,
                params: { collectionSlug: item.slug },
              })
            }}
          />
        )
      case SectionType.FeaturedCollections:
        const imageWidth = dimensions.width - space(4)
        return (
          <CollectionsRail
            title="Featured collections"
            items={item.results}
            imageWidth={imageWidth}
            imageHeight={imageWidth}
            onPressItem={(item) => {
              navigation.navigate(Schema.StackNames.HomeStack, {
                screen: Schema.PageNames.Collection,
                params: { collectionSlug: item.slug },
              })
            }}
          />
        )
      case SectionType.Products:
        return <ProductsRail title={item.title} items={item.results} />
      case SectionType.Categories:
        return <CategoriesRail title={item.title} items={item.results} />
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
        enableOverScroll
        componentType="FlatList"
        containerStyle={{
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: insets.top,
        }}
        snapPoints={[snapPoint, secondSnapPoint]}
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
