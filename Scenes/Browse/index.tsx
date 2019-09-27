import React from "react"
import { View, Text, FlatList } from "react-native"
import { Container } from "../../components/Container"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Box, Sans } from "../../components"
import styled from "styled-components/native"

const GET_PRODUCTS = gql`
  {
    allProducts {
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

          brandByBrandId {
            name
          }
        }
      }
    }
  }
`

const renderItem = ({ item }) => {
  const product = item.node
  const image = product.images && product.images[0]
  return (
    <Box mr={2} width={1 / 3}>
      <ImageContainer source={{ uri: image.url }}></ImageContainer>
      <Sans size="2" color="gray">
        {product.brandByBrandId.name}
      </Sans>
      <Sans size="2">{product.name}</Sans>
      <Sans size="2">${product.retailPrice}</Sans>
    </Box>
  )
}

export const Browse = () => {
  const { loading, data } = useQuery(GET_PRODUCTS)

  if (loading) return null

  console.log("data", data)
  const products = data.allProducts.edges

  return (
    <Container>
      <FlatList
        data={products}
        contentContainerStyle={{ paddingBottom: 150 }}
        keyExtractor={item => item.node.id}
        renderItem={item => renderItem(item)}
      />
    </Container>
  )
}

const ImageContainer = styled.Image`
  background: rgba(0, 0, 0, 0.3);
  height: 360;
  width: 240;
`
