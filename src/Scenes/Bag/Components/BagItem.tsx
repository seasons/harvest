import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import gql from "graphql-tag"
import { get } from "lodash"
import React from "react"
import { Text, TouchableWithoutFeedback } from "react-native"
import { NavigationDispatch } from "react-navigation"
import styled from "styled-components/native"
import { useQuery } from "@apollo/react-hooks"

// FIXME: Make this a fragment on GET_BAG
const GET_BAG_ITEM = gql`
  query GetBagItem($productId: ID!, $variantId: ID!) {
    product(where: { id: $productId }) {
      name
      id
      modelSize
      brand {
        name
      }
      images
      variants(where: { id: $variantId }) {
        id
        size
      }
    }
  }
`

interface BagItemProps {
  bagItem: {
    productID: String
    variantID: String
  }
  index?: Number
  sectionHeight: Number
  navigation: NavigationDispatch
  saved: Boolean
  removeItemFromBag?: Function
  removeFromBagAndSaveItem?: Function
}

export const BagItem: React.FC<BagItemProps> = ({
  bagItem,
  index,
  sectionHeight,
  navigation,
  saved,
  removeItemFromBag,
  removeFromBagAndSaveItem,
}) => {
  const { loading, error, data } = useQuery(GET_BAG_ITEM, {
    variables: {
      productId: bagItem.productID,
      variantId: bagItem.variantID,
    },
  })

  if (loading || !data) {
    return <Box height={310} />
  }

  if (error) {
    console.error("error: ", error)
  }

  const product = data && data.product

  if (!product) {
    return null
  }

  const imageURL = imageResize(get(product, "images[0].url"), "medium")
  const size = get(data, "product.variants[0].size")

  return (
    <Box py={saved ? 1 : 2} key={product.id}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Product", { id: product.id })}>
        <BagItemContainer flexDirection="row">
          <Flex style={{ flex: 2 }} p={2} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              {!saved && (
                <Sans size="3" pb={1}>
                  {index + 1}
                </Sans>
              )}
              <Sans size="2">{product.brand.name}</Sans>
              <Sans size="2" color="gray">
                {product.name}
              </Sans>
            </Box>
            <Box>
              <Text>
                <Sans size="2" color="gray">
                  Size {size}
                </Sans>
              </Text>
            </Box>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            <ImageContainer
              style={{ height: sectionHeight, width: 170 }}
              resizeMode="contain"
              source={{ uri: imageURL }}
            />
          </Flex>
        </BagItemContainer>
      </TouchableWithoutFeedback>

      {!saved && (
        <Flex flexDirection="row" pt={1}>
          <Box flex={1} pr={1}>
            <TouchableWithoutFeedback
              onPress={() => {
                removeItemFromBag({
                  variables: {
                    id: bagItem.variantID,
                  },
                })
              }}
            >
              <RemoveButton>
                <Sans size="1" textAlign="center">
                  Remove
                </Sans>
              </RemoveButton>
            </TouchableWithoutFeedback>
          </Box>
          <Box flex={1}>
            <TouchableWithoutFeedback
              onPress={() => {
                removeFromBagAndSaveItem({
                  variables: {
                    id: bagItem.variantID,
                  },
                })
              }}
            >
              <SaveForLaterButton>
                <Sans size="1" textAlign="center">
                  {!saved ? "Save For Later" : "Add to Bag"}
                </Sans>
              </SaveForLaterButton>
            </TouchableWithoutFeedback>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

const RemoveButton = styled(Box)`
  background: #f6f6f6;
  border-radius: 5px;
  height: 48px;
  padding: 10px;
`

const SaveForLaterButton = styled(Box)`
  height: 48px;
  border-radius: 5px;
  border: 1px;
  border-color: #e5e5e5;
  background: transparent;
  padding: 10px;
`

const BagItemContainer = styled(Box)`
  background: #f6f6f6;
  border-radius: 8px;
  overflow: hidden;
  height: 210px;
`

const ImageContainer = styled(FadeInImage)`
  height: 214;
`
