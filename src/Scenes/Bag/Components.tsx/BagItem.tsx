import { Box, Flex, Sans } from "App/Components"
import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Image, Text, TouchableWithoutFeedback } from "react-native"

const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(where: { id: $productId }) {
      name
      id
      modelSize
      brand {
        name
      }
      images
    }
  }
`

export const BagItem = ({ bagItem, index, sectionHeight, removeItemFromBag }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: bagItem.productID,
    },
  })

  if (loading || !data) {
    return null
  }

  if (error) {
    console.error("error: ", error)
  }

  const product = data && data.product

  const imageURL = product.images && product.images.length && product.images[0].url

  return (
    <Box p={2} key={product.id} style={{ height: sectionHeight }}>
      <Flex flexDirection="row" style={{ flex: 1 }}>
        <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
          <Box>
            <Sans size="3">{index + 1}.</Sans>
            <Sans size="2">{product.brand.name}.</Sans>
            <Sans size="2" color="gray">
              {product.name}.
            </Sans>
          </Box>
          <Box>
            <Text>
              <Sans size="2" color="gray">
                Size {product.modelSize} |
              </Sans>
              {"  "}
              <TouchableWithoutFeedback onPress={() => removeItemFromBag(bagItem)}>
                <Sans size="2" color="blue">
                  Remove
                </Sans>
              </TouchableWithoutFeedback>
            </Text>
          </Box>
        </Flex>
        <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
          <Image style={{ height: sectionHeight, width: 160 }} resizeMode="contain" source={{ uri: imageURL }} />
        </Flex>
      </Flex>
    </Box>
  )
}
