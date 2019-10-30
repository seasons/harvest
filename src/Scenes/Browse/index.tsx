import React, { useState } from "react"
import { FlatList, Dimensions, TouchableWithoutFeedback } from "react-native"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Box, Sans, Flex } from "App/Components"
import styled from "styled-components/native"
import { fontFamily } from "Components/Typography"
import { TouchableOpacity } from "react-native-gesture-handler"
import FadeIn from "@expo/react-native-fade-in-image"
import { BrowseLoader } from "./Loader"
import { imageResize } from "App/helpers/imageResize"
import get from "lodash/get"

const GET_PRODUCTS = gql`
  query getProducts($name: String!, $first: Int!, $skip: Int!) {
    productFunctions {
      name
      id
    }
    products(where: { functions_every: { name: $name } }, first: $first, skip: $skip) {
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

const renderItem = ({ item }, navigation) => {
  const itemWidth = Dimensions.get("window").width / 2 - 10
  const product = item

  const image = get(product, "images[0]", { url: "https://via.placeholder.com/150" })
  const resizedImage = imageResize(image.url, "medium")

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
      <Box m={0.5} mb={1} width={itemWidth}>
        <FadeIn>
          <ImageContainer source={{ uri: resizedImage }}></ImageContainer>
        </FadeIn>
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
  const [currentCategory, setCurrentCategory] = useState("All")
  const { data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: 10,
      skip: 0,
    },
  })
  const { navigation } = props
  const products = data && data.products
  const categories = (data && data.productFunctions) || []

  const onCategoryPress = item => {
    setCurrentCategory(item.name)
  }

  // if (loading) {
  //   return (
  //     <Container>
  //       <BrowseLoader />
  //     </Container>
  //   )
  // }

  return (
    <Container>
      <Flex flexDirection="column" flex={1}>
        <Box my={1} mx={2} height={50}>
          <SearchBar placeholder="Search Seasons" />
        </Box>
        <Box flex={1} flexGrow={1}>
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={item => renderItem(item, navigation)}
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
            data={[{ id: "all", name: "All" }, ...categories]}
            renderItem={({ item }) => {
              const selected = currentCategory == item.name
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
            keyExtractor={({ id }) => id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Box>
      </Flex>
    </Container>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 240;
`

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
