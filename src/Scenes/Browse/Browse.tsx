import { useQuery } from "@apollo/react-hooks"
import { Box, Button, Flex, Sans, Spacer, VariantSizes } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Spinner } from "App/Components/Spinner"
import { ABBREVIATED_SIZES } from "App/helpers/constants"
import { imageResize } from "App/helpers/imageResize"
import { space } from "App/utils"
import { Schema, screenTrack, useTracking } from "App/utils/track"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import get from "lodash/get"
import React, { useState, useEffect } from "react"
import { Dimensions, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { color } from "styled-system"
import { SaveProductButton } from "../Product/Components"
import { BrowseLoader } from "./Loader"
import { BrowseEmptyState } from "./BrowseEmptyState"

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
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      id
      name
      description
      images
      modelSize {
        display
      }
      modelHeight
      externalURL
      tags
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
  const { navigation } = props
  const currentFilters = props?.route?.params?.sizeFilters || []
  const [sizeFilters, setSizeFilters] = useState(currentFilters)
  const [currentCategory, setCurrentCategory] = useState("all")
  const insets = useSafeArea()
  const tracking = useTracking()

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

  const renderItem = ({ item }, i) => {
    const itemWidth = Dimensions.get("window").width / 2 - 2
    const isLeft = i % 2 === 0
    const product = item
    const brandName = get(item, "brand.name")

    if (!product) {
      return null
    }

    const data = product.images?.filter((image) => image.url) || []

    return (
      <Box mr={isLeft ? 0 : "4px"} mb={0.5} width={itemWidth}>
        <FlatList
          data={data}
          renderItem={({ item }: { item: string }) => {
            const resizedImage = item?.url && imageResize(item?.url, "medium")
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
                <Box>
                  <FadeInImage source={{ uri: resizedImage }} style={{ width: itemWidth, height: IMAGE_HEIGHT }} />
                </Box>
              </TouchableWithoutFeedback>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          snapToInterval={itemWidth}
          decelerationRate="fast"
        />
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
          <Box>
            <Flex flexDirection="row" justifyContent="space-between">
              <Box my={0.5} mx={1}>
                {brandName && <Sans size="0">{brandName}</Sans>}
                <VariantSizes size="0" variants={item.variants} />
              </Box>
              <SaveProductButton
                grayStroke
                height={16}
                width={12}
                product={product}
                onPressSaveButton={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.SaveProductButtonTapped,
                    actionType: Schema.ActionTypes.Tap,
                  })
                }}
              />
            </Flex>
            <Spacer mb={0.5} />
          </Box>
        </TouchableWithoutFeedback>
      </Box>
    )
  }

  const reachedEnd = products?.length >= data?.productsCount?.aggregate?.count

  return (
    <Container insetsBottom={false}>
      <LoaderContainer mt={insets.top} style={{ opacity: loaderAnimation.loaderStyle }}>
        <BrowseLoader imageHeight={IMAGE_HEIGHT} />
      </LoaderContainer>
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
            renderItem={(item, i) => renderItem(item, i)}
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
