import React from "react"
import { FlatList, Dimensions, TouchableWithoutFeedback } from "react-native"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Box, Sans, Flex } from "App/Components"
import styled from "styled-components/native"
import { fontFamily } from "Components/Typography"

const GET_PRODUCTS = gql`
  {
    productFunctions {
      name
      id
    }
    products(where: { functions_every: { name: "Statement" } }, first: 10) {
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
  const image = product.images && product.images[0]
  const thumbnail = (image && image.thumbnails && image.thumbnails.large) || { url: "https://via.placeholder.com/150" }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
      <Box m={0.5} mb={1} width={itemWidth}>
        <ImageContainer source={{ uri: thumbnail.url }}></ImageContainer>
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
  const { loading, data } = useQuery(GET_PRODUCTS)
  const { navigation } = props

  if (loading) {
    return null
  }

  const products = data && data.products
  const categories = (data && data.productFunctions) || []

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
          />
        </Box>
        <Box height={50}>
          <CategoryPicker
            data={[{ id: "all", name: "All" }, ...categories]}
            renderItem={({ item }) => {
              return (
                <Box mr={2}>
                  <Sans size="1">{item.name}</Sans>
                </Box>
              )
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
