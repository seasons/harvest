import React from "react"
import { FlatList, Dimensions } from "react-native"
import { Container } from "Components/Container"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Box, Sans, Flex } from "App/Components"
import styled from "styled-components/native"
import { fontFamily } from "Components/Typography"

const GET_PRODUCTS = gql`
  {
    categories {
      edges {
        node {
          id
          name
          description
        }
      }
    }
    products {
      edges {
        node {
          id
          name
          description
          images
          modelSize
          modelHeight
          externalUrl
          tags
          retailPrice
          createdAt
          updatedAt

          brand {
            name
          }
        }
      }
    }
  }
`

const renderItem = ({ item }) => {
  const itemWidth = Dimensions.get("window").width / 2 - 10
  const product = item.node
  const image = product.images && product.images[0]
  const thumbnail = (image && image.thumbnails && image.thumbnails.large) || { url: "https://via.placeholder.com/150" }

  return (
    <Box m={1} mb={2} width={itemWidth}>
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
  )
}

export const Browse = () => {
  const { loading, data } = useQuery(GET_PRODUCTS)

  if (loading) {
    return null
  }

  const products = data && data.products.edges
  const categories = data && data.categories.edges

  return (
    <Container>
      <Flex flexDirection="column" pb="150">
        <Box my={2} mx={4}>
          <SearchBar placeholder="Search Seasons" />
        </Box>
        <Flex>
          <FlatList
            data={products}
            keyExtractor={item => item.node.id}
            renderItem={item => renderItem(item)}
            numColumns={2}
          />
        </Flex>
        <Box my={1} mx={0} height="70" backgroundColor="blue">
          <CategoryPicker
            data={categories}
            renderItem={({ item }) => {
              return (
                <Box mr={2}>
                  <Sans size="1">{item.node.name}</Sans>
                </Box>
              )
            }}
            keyExtractor={({ node }) => node.id.toString()}
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
  height: 70;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`
