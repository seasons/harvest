import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Loader } from "App/Components/Loader"
import { imageResize } from "App/helpers/imageResize"
import { Container } from "Components/Container"
import { fontFamily } from "Components/Typography"
import gql from "graphql-tag"
import get from "lodash/get"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, Image, TouchableWithoutFeedback } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSafeArea } from "react-native-safe-area-context"
import styled from "styled-components/native"

import { useQuery } from "@apollo/react-hooks"

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
    products(category: $name, first: $first, skip: $skip) {
      id
      name
      description
      images
      modelSize
      modelHeight
      externalURL
      tags
      retailPrice
      createdAt
      updatedAt

      brand {
        name
      }
    }
  }
`

const renderItem = ({ item }, i, navigation) => {
  const itemWidth = Dimensions.get("window").width / 2 - 10
  const product = item

  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "medium")

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
      <Box m={0.5} mb={1} width={itemWidth}>
        <FadeInImage source={{ uri: resizedImage }} style={{ width: "100%", height: 240 }} />

        <Box m={2}>
          <Sans size="0">{product.brand.name}</Sans>
          <Sans size="0" color="gray">
            {product.name}
          </Sans>
          <Sans size="0" color="gray">
            ${product.retailPrice}
          </Sans>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  )
}

export const Browse = (props: any) => {
  const [currentCategory, setCurrentCategory] = useState(props.screenProps.browseFilter || "all")
  const [showLoader, toggleLoader] = useState(true)
  const { data, loading, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: 10,
      skip: 0,
    },
  })
  let scrollViewEl = null

  useEffect(() => {
    setCurrentCategory(props.screenProps.browseFilter)
  }, [props.screenProps.browseFilter])

  useEffect(() => {
    if (scrollViewEl) {
      scrollViewEl.scrollToOffset({ x: 0, y: 0, animated: true })
    }
  }, [currentCategory])

  useEffect(() => {
    setTimeout(() => {
      toggleLoader(loading)
    }, 500)
  }, [loading])

  const { navigation } = props
  const products = data && data.products
  const categories = (data && data.categories) || []
  const insets = useSafeArea()

  const onCategoryPress = item => {
    setCurrentCategory(item.slug)
  }

  if (showLoader && !data) {
    return <Loader />
  }

  return (
    <Container>
      <Flex flexDirection="column" flex={1} pt={insets.top} ref={scrollViewEl}>
        <Box flex={1} flexGrow={1}>
          <FlatList
            data={products}
            ref={ref => (scrollViewEl = ref)}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => (
              <Box p={2}>
                <Sans size="3" color="black">
                  Browse
                </Sans>
                <Sans size="2" color="gray">
                  Viewing all categories
                </Sans>
              </Box>
            )}
            renderItem={(item, i) => renderItem(item, i, navigation)}
            numColumns={2}
            onEndReached={() => {
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
            }}
          />
        </Box>
        <Box height={50}>
          <CategoryPicker
            data={[{ slug: "all", name: "All" }, ...categories]}
            renderItem={({ item }) => {
              const selected = currentCategory == item.slug
              return (
                <TouchableOpacity onPress={() => onCategoryPress(item)}>
                  <Category mr={3} selected={selected}>
                    <Sans size="0" style={{ opacity: selected ? 1.0 : 0.5 }}>
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

const SearchBar = styled.TextInput`
  background-color: #f2f2f2;
  border-radius: 21px;
  height: 42px;
  width: 100%;
  font-family: ${fontFamily.sans.medium};
  font-size: 16px;
  text-align: center;
`

const CategoryPicker = styled.FlatList`
  height: 100%;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`

const Category = styled(Box)`
  ${p =>
    p.selected &&
    `
    border-bottom-color: black;
    border-bottom-width: 3px;
  `};
`
