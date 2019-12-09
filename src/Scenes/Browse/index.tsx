import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Loader } from "App/Components/Loader"
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

import { useQuery } from "@apollo/react-hooks"

import { BrowseLoader } from "./Loader"

const GET_PRODUCTS = gql`
  query getProducts($name: String!, $first: Int!, $skip: Int!) {
    categories(where: { visible: true }) {
      id
      slug
      name
      children {
        slug
      }
    }
    products(category: $name, first: $first, skip: $skip, where: { status: Available }) {
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
    }
  }
`

const renderItem = ({ item }, i, navigation) => {
  const itemWidth = Dimensions.get("window").width / 2 - 5
  const product = item

  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "medium")
  const isLeft = i % 2 === 0

  const brandName = get(product, "brand.name")

  if (!product) {
    return null
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
      <Box mr={isLeft ? 0.0 : "10px"} mb={1} width={itemWidth}>
        <FadeInImage source={{ uri: resizedImage }} style={{ width: "100%", height: 240 }} />

        <Box my={2} mx={1}>
          {brandName && (
            <Sans size="0" mb={0.5}>
              {brandName}
            </Sans>
          )}
          <Sans size="0" color="gray" mb={0.5}>
            {product.name}
          </Sans>
          <Sans size="0" color="gray" mb={0.5}>
            ${product.retailPrice}
          </Sans>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  )
}

export const Browse = (props: any) => {
  const [currentCategory, setCurrentCategory] = useState("all")
  const { data, loading, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: 10,
      skip: 0,
    },
  })
  let scrollViewEl = null

  useEffect(() => {
    const browseFilter = props && props.screenProps && props.screenProps.browseFilter
    if (browseFilter && browseFilter !== currentCategory) {
      setCurrentCategory(props.screenProps.browseFilter)
    }
  }, [props.screenProps.browseFilter])

  const insets = useSafeArea()
  const loaderStyle = useSpring({ opacity: loading && !data ? 1 : 0 })
  const containerStyle = useSpring({ opacity: loading && !data ? 0 : 1 })
  const { navigation } = props
  const products = data && data.products
  const categories = (data && data.categories) || []
  const selectedCategory = categories.find(c => c.slug === currentCategory)

  const onCategoryPress = item => {
    if (item.slug !== currentCategory) {
      setCurrentCategory(item.slug)
    }
  }

  return (
    <Container>
      <LoaderContainer mt={insets.top} style={[loaderStyle]}>
        <BrowseLoader />
      </LoaderContainer>
      <AnimatedFlex flexDirection="column" flex={1} pt={insets.top} ref={scrollViewEl} style={[containerStyle]}>
        <Box flex={1} flexGrow={1}>
          <FlatList
            data={products}
            ref={ref => (scrollViewEl = ref)}
            keyExtractor={(item, index) => item.id + index}
            ListHeaderComponent={() => (
              <Box p={2}>
                <Sans size="3" color="black">
                  Browse
                </Sans>
                <Sans size="2" color="gray">
                  {currentCategory === "all"
                    ? "Viewing all categories"
                    : `Viewing by ${selectedCategory.name.toLowerCase()}`}
                </Sans>
              </Box>
            )}
            renderItem={(item, i) => renderItem(item, i, navigation)}
            numColumns={2}
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              if (!loading) {
                fetchMore({
                  variables: {
                    skip: products.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
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
        </Box>
        <Box height={70}>
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
      </AnimatedFlex>
    </Container>
  )
}

const CategoryPicker = styled.FlatList`
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top-color: #e5e5e5;
  border-style: solid;
  border-top-width: 1px;
`

const LoaderContainer = animated(styled(Box)`
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
`)

const AnimatedFlex = animated(Flex)

const Category = styled(Box)`
  ${p =>
    p.selected &&
    `
    border-bottom-color: black;
    border-bottom-width: 3px;
  `};
`
