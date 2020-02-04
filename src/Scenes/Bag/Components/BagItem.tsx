import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import gql from "graphql-tag"
import { get, head } from "lodash"
import React from "react"
import { Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import styled from "styled-components/native"
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation"

export const BagItemFragment = gql`
  fragment BagItemProductVariant on ProductVariant {
    product {
      name
      id
      modelSize
      brand {
        name
      }
      images
      variants {
        id
        size
      }
    }
  }
`

interface BagItemProps {
  bagItem: any
  index?: number
  sectionHeight: number
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>
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
  if (!bagItem) {
    return <></>
  }
  const variantToUse = head(
    (get(bagItem, "productVariant.product.variants") || []).filter(a => a.id === bagItem.variantID)
  )
  const product = get(bagItem, "productVariant.product")
  const imageURL = imageResize(get(product, "images[0].url"), "medium")
  const variantSize = get(variantToUse, "size")

  return (
    <Box py={saved ? 1 : 2} key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => (navigation ? navigation.navigate("Product", { id: product.id }) : null)}
      >
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
                  Size {variantSize}
                </Sans>
              </Text>
            </Box>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            {!!imageURL && (
              <ImageContainer
                style={{ height: sectionHeight, width: 170 }}
                resizeMode="contain"
                source={{ uri: imageURL }}
              />
            )}
          </Flex>
        </BagItemContainer>
      </TouchableWithoutFeedback>

      {!saved && (
        <Flex flexDirection="row" pt={1}>
          <Box flex={1} pr={1}>
            <TouchableOpacity
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
            </TouchableOpacity>
          </Box>
          <Box flex={1}>
            <TouchableOpacity
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
            </TouchableOpacity>
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
