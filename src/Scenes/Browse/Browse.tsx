import { useQuery } from "@apollo/react-hooks"
import { useFocusEffect } from "@react-navigation/native"
import { Box, Button, Flex, ProductGridItem, Sans } from "App/Components"
import { Spinner } from "App/Components/Spinner"
import { ABBREVIATED_SIZES } from "App/helpers/constants"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { FlatList, StatusBar, TouchableOpacity } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { color } from "styled-system"
import { BrowseEmptyState } from "./BrowseEmptyState"
import { BrowseLoader } from "./Loader"

const IMAGE_HEIGHT = 240

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
          display
          top {
            letter
          }
          bottom {
            value
          }
        }
      }
    }
  }
`

export const Browse = screenTrack()((props: any) => {
  const currentFilters = props?.route?.params?.sizeFilters || []
  const [sizeFilters, setSizeFilters] = useState(currentFilters)
  const [currentCategory, setCurrentCategory] = useState("all")
  const insets = useSafeArea()
  const tracking = useTracking()

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content")
    }, [])
  )

  const PAGE_LENGTH = 10

  useEffect(() => {
    setSizeFilters(currentFilters)
  }, [currentFilters])

  const sizes =
    sizeFilters && sizeFilters.length > 0
      ? sizeFilters.map((s) => {
          return ABBREVIATED_SIZES[s] ? ABBREVIATED_SIZES[s] : s
        })
      : []

  const { data, loading, fetchMore } = useQuery(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: PAGE_LENGTH,
      skip: 0,
      orderBy: "createdAt_DESC",
      sizes,
    },
  })

  const products = data && data.products

  const loaderAnimation = useSpring({
    loaderStyle: !data ? 1 : 0,
    productsBoxStyle: !data ? 0 : 1,
  })

  let scrollViewEl = null
  const categories = (data && data.categories) || []
  const filtersButtonHeight = 36
  const numFiltersSelected = sizeFilters?.length

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
      <Flex flexDirection="column" flex={1}>
        <AnimatedBox flex={1} flexGrow={1} style={{ opacity: loaderAnimation.productsBoxStyle }}>
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
            data={products}
            ref={(ref) => (scrollViewEl = ref)}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }, i) => <ProductGridItem showBrandName product={item} addLeftSpacing={i % 2 !== 0} />}
            numColumns={2}
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
              // If we are sorting alphabetically, all products are returned so we do not need
              // to fetch any more
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
                  updateQuery: (prev, { fetchMoreResult }) => {
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
        </AnimatedBox>
        <Box height={56} style={{ opacity: !data ? 0 : 1 }}>
          <CategoryPicker
            data={[{ slug: "all", name: "All" }, ...categories]}
            renderItem={({ item }) => {
              const selected = currentCategory == item.slug
              return (
                <TouchableOpacity onPress={() => onCategoryPress(item)}>
                  <Category mr={4} selected={selected}>
                    <Sans size="1" style={{ opacity: selected ? 1.0 : 0.5 }}>
                      {item.name}
                    </Sans>
                  </Category>
                </TouchableOpacity>
              )
            }}
            contentContainerStyle={{
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            keyExtractor={({ slug }) => slug}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Box>
      </Flex>
      <LoaderContainer mt={insets.top} style={{ opacity: loaderAnimation.loaderStyle }}>
        <BrowseLoader imageHeight={IMAGE_HEIGHT} />
      </LoaderContainer>
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

const LoaderContainer = animated(styled(Box)`
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`)

const AnimatedBox = animated(Box)

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
