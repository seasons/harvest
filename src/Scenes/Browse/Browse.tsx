import { Box, Button, Flex, Sans, Spacer, VariantSizes } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import get from "lodash/get"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, TouchableWithoutFeedback } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSafeArea } from "react-native-safe-area-context"
import { animated, useSpring } from "react-spring/native.cjs"
import styled from "styled-components/native"
import { color } from "styled-system"

import { useQuery } from "@apollo/react-hooks"

import { BrowseLoader } from "./Loader"

const ABBREVIATED_SIZES = {
  "X-Small": "XS",
  Small: "S",
  Medium: "M",
  Large: "L",
  "X-Large": "XL",
  "XX-Large": "XXL",
}
const IMAGE_HEIGHT = 240

const GET_BROWSE_PRODUCTS = gql`
  query GetBrowseProducts($name: String!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!, $sizes: [Size!]) {
    categories(where: { visible: true }) {
      id
      slug
      name
      children {
        slug
      }
    }
    products(
      category: $name
      first: $first
      skip: $skip
      orderBy: $orderBy
      sizes: $sizes
      where: { status: Available }
    ) {
      id
      name
      description
      images
      modelSize
      modelHeight
      externalURL
      tags
      retailPrice
      status
      createdAt
      updatedAt
      brand {
        name
      }
      variants {
        id
        size
        total
        reservable
        nonReservable
        reserved
        isSaved
      }
    }
  }
`

const renderItem = ({ item }, i, navigation) => {
  const itemWidth = Dimensions.get("window").width / 2 - 2
  const product = item

  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "large")
  const isLeft = i % 2 === 0

  const brandName = get(product, "brand.name")

  if (!product) {
    return null
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
      <Box mr={isLeft ? 0.0 : "4px"} mb={0.5} width={itemWidth}>
        <FadeInImage source={{ uri: resizedImage }} style={{ width: "100%", height: IMAGE_HEIGHT }} />
        <Box my={0.5} mx={1}>
          {brandName && <Sans size="0">{brandName}</Sans>}
          <VariantSizes size="0" variants={product.variants} />
        </Box>
        <Spacer mb={0.5} />
      </Box>
    </TouchableWithoutFeedback>
  )
}

export const Browse = (props: any) => {
  const sortFilter = get(props, "navigation.state.params.sortFilter", "")
  const sizeFilters = get(props, "navigation.state.params.sizeFilters", [])
  const [currentCategory, setCurrentCategory] = useState("all")

  // Get all the sizes that we want to query by.
  // If no size filter is selected, all sizes are queried.
  const isSortingAlphabetically = sortFilter && sortFilter === "Alphabetical"
  const orderBy = isSortingAlphabetically ? "name_ASC" : "createdAt_DESC"
  const sizes =
    sizeFilters && sizeFilters.length > 0
      ? sizeFilters.map(s => ABBREVIATED_SIZES[s])
      : Object.values(ABBREVIATED_SIZES)
  const { data, loading, fetchMore } = useQuery(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: 10,
      skip: 0,
      orderBy,
      sizes,
    },
  })

  let products = data && data.products
  let scrollViewEl = null

  useEffect(() => {
    const browseFilter = props && props.screenProps && props.screenProps.browseFilter
    if (browseFilter && browseFilter !== currentCategory) {
      setCurrentCategory(props.screenProps.browseFilter)
    }
  }, [props.screenProps.browseFilter])

  const insets = useSafeArea()
  const loaderStyle = useSpring({ opacity: loading && !data ? 1 : 0 })
  const productsBoxStyle = useSpring({ opacity: loading && !data ? 0 : 1 })
  const { navigation } = props
  const categories = (data && data.categories) || []
  const filtersButtonBottom = 16
  const filtersButtonHeight = 36
  const numFiltersSelected = sizeFilters.length + (sortFilter !== "" ? 1 : 0)

  let filtersButtonVariant
  let filtersButtonWidth
  let filtersButtonText
  let filtersButtonTextColor
  if (numFiltersSelected > 0) {
    // Selected filters state
    filtersButtonVariant = "primaryBlack"
    filtersButtonWidth = 97
    filtersButtonText = `Filters +${numFiltersSelected}`
    filtersButtonTextColor = "white"
  } else {
    // No filters selected state
    filtersButtonVariant = "primaryWhite"
    filtersButtonWidth = 78
    filtersButtonText = "Filters"
    filtersButtonTextColor = "black"
  }

  const onCategoryPress = item => {
    if (item.slug !== currentCategory) {
      setCurrentCategory(item.slug)
    }
    scrollViewEl.scrollToOffset({ offset: 0, animated: true })
  }

  const onFilterBtnPress = () => {
    props.navigation.navigate("FiltersModal", { sortFilter, sizeFilters })
  }

  return (
    <Container>
      <LoaderContainer mt={insets.top} style={[loaderStyle]}>
        <BrowseLoader imageHeight={IMAGE_HEIGHT} />
      </LoaderContainer>
      <Flex flexDirection="column" flex={1}>
        <AnimatedBox flex={1} flexGrow={1} style={[productsBoxStyle]}>
          <FlatList
            contentContainerStyle={{ paddingTop: insets.top, paddingBottom: filtersButtonBottom + filtersButtonHeight }}
            data={products}
            ref={ref => (scrollViewEl = ref)}
            keyExtractor={(item, index) => item.id + index}
            renderItem={(item, i) => renderItem(item, i, navigation)}
            numColumns={2}
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              // If we are sorting alphabetically, all products are returned so we do not need
              // to fetch any more
              if (!loading && !isSortingAlphabetically) {
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
          <FixedButtonContainer bottom={filtersButtonBottom}>
            <Button
              borderRadius={18}
              height={filtersButtonHeight}
              width={filtersButtonWidth}
              variant={filtersButtonVariant}
              onPress={onFilterBtnPress}
            >
              <Sans color={color(filtersButtonTextColor)} size="1" weight="medium">
                {filtersButtonText}
              </Sans>
            </Button>
          </FixedButtonContainer>
        </AnimatedBox>
        <Box height={60} mb={insets.bottom} style={{ opacity: !data ? 0 : 1 }}>
          <CategoryPicker
            data={[{ slug: "all", name: "All" }, ...categories]}
            renderItem={({ item }) => {
              const selected = currentCategory == item.slug
              return (
                <TouchableOpacity onPress={() => onCategoryPress(item)}>
                  <Category mr={3} mt={1} selected={selected}>
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
}

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
  ${p =>
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
