import { useQuery } from "@apollo/react-hooks"
import { useFocusEffect } from "@react-navigation/native"
import { Box, Button, Flex, ProductGridItem, Sans, Skeleton, Spacer } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import { ABBREVIATED_SIZES } from "App/helpers/constants"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { FlatList, StatusBar, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { color } from "styled-system"
import { BrowseEmptyState } from "./BrowseEmptyState"
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
    categories(where: { visible: true }) {
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
      name
      description
      images {
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
  const [items, setItems] = useState(new Array(PAGE_LENGTH).fill({ id: "" }))
  const [categoryItems, setCategoryItems] = useState(new Array(PAGE_LENGTH).fill({ slug: "" }))
  const [sizeFilters, setSizeFilters] = useState(currentFilters)
  const [currentCategory, setCurrentCategory] = useState("all")
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
      orderBy: "createdAt_DESC",
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

  console.log("data browse", data)
  const reachedEnd = products?.length >= data?.productsCount?.aggregate?.count

  return (
    <Container insetsBottom={false}>
      <Flex flexDirection="column" flex={1}>
        <Box flex={1} flexGrow={1}>
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
                <Box key={index}>
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
              if (!loading && !reachedEnd) {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BrowsePagePaginated,
                  actionType: Schema.ActionTypes.Tap,
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
            data={categoryItems}
            renderItem={({ item }, index) => {
              const selected = currentCategory == item.slug
              return (
                <Box key={index}>
                  {!!item.name ? (
                    <TouchableOpacity onPress={() => onCategoryPress(item)}>
                      <Category mr={4} selected={selected}>
                        <Sans size="1" style={{ opacity: selected ? 1.0 : 0.5 }}>
                          {item.name}
                        </Sans>
                      </Category>
                    </TouchableOpacity>
                  ) : (
                    <Box mr={4}>
                      <Spacer mb="5px" />
                      <Skeleton width={50} height={15} />
                    </Box>
                  )}
                </Box>
              )
            }}
            contentContainerStyle={{
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            keyExtractor={(item, index) => item.slug + index}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Box>
      </Flex>
    </Container>
  )
})

const CategoryPicker = styled.FlatList`
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top-color: black;
  border-style: solid;
  border-top-width: 1px;
`

const Category = styled(Box)`
  ${(p) =>
    p.selected &&
    `
    border-bottom-color: black;
    border-bottom-width: 3px;
  `};
`

const FixedButtonContainer = styled(Box)`
  position: absolute;
  align-self: center;
`
