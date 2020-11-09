import { useQuery } from "@apollo/react-hooks"
import { useFocusEffect } from "@react-navigation/native"
import { Box, Button, Flex, ProductGridItem } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import { ABBREVIATED_SIZES } from "App/helpers/constants"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { FlatList, StatusBar } from "react-native"
import styled from "styled-components/native"
import { color } from "styled-system"
import { BrowseEmptyState } from "./BrowseEmptyState"
import { CategoryPicker } from "./CategoryPicker"
import { ProductGridItemSkeleton } from "../Product/Components"
import { GetBrowseProducts } from "App/generated/GetBrowseProducts"

export const GET_BROWSE_PRODUCTS = gql`
  query GetBrowseProducts(
    $name: String!
    $first: Int!
    $skip: Int!
    $orderBy: ProductOrderByInput!
    $sizes: [String!]
  ) {
    categories(where: { visible: true }, orderBy: updatedAt_ASC) {
      id
      slug
      name
      children {
        id
        slug
      }
    }
    productsCount: productsConnection(
      category: $name
      sizes: $sizes
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      aggregate {
        count
      }
    }
    products(
      category: $name
      first: $first
      skip: $skip
      sizes: $sizes
      orderBy: $orderBy
      where: { status: Available }
    ) {
      id
      slug
      name
      description
      images(size: Thumb) {
        id
        url
      }
      modelSize {
        id
        display
      }
      modelHeight
      externalURL
      retailPrice
      status
      type
      createdAt
      updatedAt
      brand {
        id
        name
      }
      variants {
        id
        total
        reservable
        nonReservable
        reserved
        isSaved
        internalSize {
          id
          display
          top {
            id
            letter
          }
          bottom {
            id
            value
          }
        }
      }
    }
  }
`

const PAGE_LENGTH = 10

export const Browse = screenTrack()((props: any) => {
  const currentFilters = props?.route?.params?.sizeFilters || []
  const routeCategorySlug = props?.route?.params?.categorySlug || "all"
  const [items, setItems] = useState(new Array(PAGE_LENGTH).fill({ id: "" }))
  const [categoryItems, setCategoryItems] = useState(new Array(PAGE_LENGTH).fill({ slug: "" }))
  const [sizeFilters, setSizeFilters] = useState(currentFilters)
  const [currentCategory, setCurrentCategory] = useState(routeCategorySlug)
  const routeCategoryIdx = categoryItems.findIndex(({ slug }) => slug === routeCategorySlug)
  const tracking = useTracking()

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content")
    }, [])
  )

  useEffect(() => {
    setSizeFilters(currentFilters)
  }, [currentFilters])

  const sizes =
    sizeFilters && sizeFilters.length > 0
      ? sizeFilters.map((s) => {
          return ABBREVIATED_SIZES[s] ? ABBREVIATED_SIZES[s] : s
        })
      : []

  const { data, loading, fetchMore } = useQuery<GetBrowseProducts>(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: PAGE_LENGTH,
      skip: 0,
      orderBy: "publishedAt_DESC",
      sizes,
    },
  })

  const products = data?.products
  const categories = data && data.categories

  useEffect(() => {
    if (products) {
      setItems(products)
    }
    if (categories) {
      setCategoryItems([{ slug: "all", name: "All" }, ...categories])
    }
  }, [data])

  let scrollViewEl = null
  const filtersButtonHeight = 36
  const numFiltersSelected = sizeFilters?.length
  const numColumns = 2

  const filtersButtonVariant = numFiltersSelected > 0 ? "primaryBlack" : "primaryWhite"
  const filtersButtonText = numFiltersSelected > 0 ? `Filters +${numFiltersSelected}` : "Filters"
  const filtersButtonTextColor = numFiltersSelected > 0 ? "white100" : "black100"

  const onCategoryPress = (item) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.CategoryTapped,
      actionType: Schema.ActionTypes.Tap,
      category: item.slug,
    })
    if (item.slug !== currentCategory) {
      setCurrentCategory(item.slug)
    }
    scrollViewEl.scrollToOffset({ offset: 0, animated: true })
  }

  const onFilterBtnPress = () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.FiltersButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    props.navigation.navigate("Modal", { screen: "FiltersModal", params: { sizeFilters } })
  }

  const reachedEnd = products?.length >= data?.productsCount?.aggregate?.count

  return (
    <Container insetsBottom={false}>
      <Flex flexDirection="column" style={{ flex: 1 }}>
        <Box style={{ flex: 1, flexGrow: 1 }}>
          <FlatList
            contentContainerStyle={
              products?.length
                ? {
                    paddingBottom: filtersButtonHeight,
                  }
                : { flex: 1 }
            }
            ListEmptyComponent={() => (
              <BrowseEmptyState setCurrentCategory={setCurrentCategory} setSizeFilters={setSizeFilters} />
            )}
            data={items}
            ref={(ref) => (scrollViewEl = ref)}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }, index) => {
              return (
                <Box key={item?.id || index}>
                  {item.id ? (
                    <ProductGridItem showBrandName product={item} addLeftSpacing={index % numColumns !== 0} />
                  ) : (
                    <ProductGridItemSkeleton addLeftSpacing={index % numColumns !== 0} />
                  )}
                </Box>
              )
            }}
            numColumns={numColumns}
            ListFooterComponent={() => (
              <>
                {loading && (
                  <Flex style={{ height: 40 }} flexDirection="row" justifyContent="center">
                    <Spinner />
                  </Flex>
                )}
              </>
            )}
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              if (!loading && !reachedEnd && products?.length) {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BrowsePagePaginated,
                  actionType: Schema.ActionTypes.Swipe,
                  pageNumber: Math.ceil(products.length / PAGE_LENGTH) + 1,
                })
                fetchMore({
                  variables: {
                    skip: products.length,
                  },
                  updateQuery: (prev: GetBrowseProducts, { fetchMoreResult }) => {
                    if (!prev) {
                      return []
                    }

                    if (!fetchMoreResult) {
                      return prev
                    }
                    return Object.assign({}, prev, {
                      products: [...prev.products, ...fetchMoreResult.products],
                    })
                  },
                })
              }
            }}
          />
          <FixedButtonContainer bottom={space(2)}>
            <Button
              color={color(filtersButtonTextColor)}
              size="small"
              variant={filtersButtonVariant}
              onPress={onFilterBtnPress}
            >
              {filtersButtonText}
            </Button>
          </FixedButtonContainer>
        </Box>
        <Box height={56}>
          <CategoryPicker
            items={categoryItems}
            onCategoryPress={onCategoryPress}
            currentCategory={currentCategory}
            initialScrollIndex={routeCategoryIdx}
          />
        </Box>
      </Flex>
    </Container>
  )
})

const FixedButtonContainer = styled(Box)`
  position: absolute;
  align-self: center;
`
