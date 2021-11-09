import { Box, Flex, Handle } from "App/Components"
import { HomepageBanner } from "App/Components/HomepageBanner"
import { Spinner } from "App/Components/Spinner"
import { Homepage_Query as Homepage_Query_Type } from "App/generated/Homepage_Query"
import {
  HomepageNoCache_Query as HomepageNoCache_Query_Type
} from "App/generated/HomepageNoCache_Query"
import { Schema } from "App/Navigation/schema"
import { BagView } from "App/Scenes/Bag/Bag"
import { seasonAndYear, space } from "App/utils"
import gql from "graphql-tag"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"

import { useNavigation, useScrollToTop } from "@react-navigation/native"
import { CollectionsRail, ProductsRail } from "@seasons/eclipse"

import { BrandsRail, CategoriesRail, FitPicCollection, HomeFooter, TagsRail } from "./"
import { AccessoriesRail } from "./AccessoriesRail"
import { AddPhotoButton } from "./AddPhotoButton"
import { FitPicCollectionRef } from "./FitPicCollection"

const dimensions = Dimensions.get("window")

enum SectionType {
  BlogPosts = "BlogPosts",
  Products = "Products",
  Brands = "Brands",
  ArchivalProducts = "ArchivalProducts",
  UpcomingProducts = "UpcomingProducts",
  SavedProducts = "SavedProducts",
  FitPics = "FitPics",
  Categories = "Categories",
  ProductsByTag = "ProductsByTag",
  Collection = "Collection",
  Banner = "Banner",
  FeaturedCollections = "FeaturedCollections",
}

export const HomeBottomSheetFragment_Query = gql`
  fragment HomeBottomSheetFragment_Query on Query {
    featuredBrands: brands(
      where: { products_some: { id_not: null }, name_not: null, featured: true, published: true }
      orderBy: name_ASC
    ) {
      id
      name
      slug
    }
  }
`

const sectionsFrom = (data: Homepage_Query_Type, dataNoCache: HomepageNoCache_Query_Type, navigation) => {
  const sections = []
  if (data?.blogPosts) {
    sections.push({ type: SectionType.BlogPosts, results: data?.blogPosts })
  }

  const customerStatus = dataNoCache?.me?.customer?.status
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

  if (data?.justAddedTops?.length) {
    sections.push({ type: SectionType.Products, results: data?.justAddedTops, title: "Just added tops" })
  }
  if (data?.featuredBrands?.length) {
    sections.push({
      type: SectionType.Brands,
      results: data?.featuredBrands,
    })
  }
  if (data?.justAddedOuterwear?.length) {
    sections.push({ type: SectionType.Products, results: data?.justAddedOuterwear, title: "Just added outerwear" })
  }

  sections.push({ type: SectionType.Categories })
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

  if (dataNoCache?.me?.recentlyViewedProducts?.length) {
    sections.push({
      type: SectionType.Products,
      results: dataNoCache?.me?.recentlyViewedProducts,
      title: "Recently viewed",
    })
  }

  if (data?.upcomingProducts?.length > 0) {
    sections.push({
      type: SectionType.UpcomingProducts,
      title: "Upcoming releases",
      results: data?.upcomingProducts,
    })
  }

  if (data?.justAddedAccessories?.length) {
    sections.push({ type: SectionType.Products, results: data?.justAddedAccessories, title: "Just added accessories" })
  }

  if (dataNoCache?.me?.savedItems?.length) {
    const results = dataNoCache?.me?.savedItems?.map((item) => item?.productVariant?.product)
    sections.push({ type: SectionType.SavedProducts, title: "Saved for later", results })
  }

  if (data?.fitPicsConnection?.edges?.length > 0) {
    sections.push({ type: SectionType.FitPics, results: data?.fitPicsConnection.edges })
  }
  return sections
}

const seasonAndYearText = seasonAndYear()

interface HomeBottomSheetProps {
  data: Homepage_Query_Type
  dataNoCache: HomepageNoCache_Query_Type
  fetchMoreFitPics: () => void
  isFetchingMoreFitPics: boolean
}

export const HomeBottomSheet: React.FC<HomeBottomSheetProps> = ({
  data,
  fetchMoreFitPics,
  isFetchingMoreFitPics,
  dataNoCache,
}) => {
  const navigation = useNavigation()
  const [sections, setSections] = useState(sectionsFrom(data, dataNoCache, navigation))
  const insets = useSafeAreaInsets()
  const [flatListHeight, setFlatListHeight] = useState(0)
  const fitPicCollectionRef: React.MutableRefObject<FitPicCollectionRef> = useRef(null)
  let [addPhotoButtonVisible, setAddPhotoButtonVisible] = useState(false)
  const innerFlatListRef = useRef(null)
  const bottomSheetRef: React.MutableRefObject<ScrollBottomSheet<string>> = useRef(null)

  useScrollToTop(innerFlatListRef)
  useEffect(() => setSections(sectionsFrom(data, dataNoCache, navigation)), [data, navigation])

  const blogContentHeight = dimensions.width
  const snapPoint = 0
  const secondSnapPoint = blogContentHeight - insets.top

  const renderItem = (item) => {
    switch (item.type) {
      case SectionType.Banner:
        return <HomepageBanner banner={item.banner} />
      case SectionType.Brands:
        return <BrandsRail items={item.results} title="Designers" />
      case SectionType.ArchivalProducts:
        return <TagsRail title={item.title} items={item.results} tagData={item.tagData} />
      case SectionType.UpcomingProducts:
        return (
          <ProductsRail
            disableClickThrough
            large
            title="Upcoming releases"
            rightText={seasonAndYearText}
            items={item.results}
          />
        )
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
        const accessories = item.title === "Just added accessories" ? item.title : null
        switch (accessories) {
          case "Just added accessories":
            return <AccessoriesRail title={item.title} items={item.results} />
          default:
            return <ProductsRail title={item.title} items={item.results} />
        }
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
        innerRef={innerFlatListRef}
        snapPoints={[snapPoint, secondSnapPoint]}
        initialSnapIndex={1}
        renderHandle={() => (
          <Handle style={{ marginTop: space(2), marginBottom: space(1) }} backgroundColor="black10" />
        )}
        keyExtractor={(item: any, i) => item.type.toString() + i}
        data={sections}
        renderItem={({ item }) => renderItem(item)}
        ListFooterComponent={() => <HomeFooter navigation={navigation} />}
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
