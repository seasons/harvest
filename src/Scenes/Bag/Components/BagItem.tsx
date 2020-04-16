import { Box, Flex, Sans } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Schema, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get, head } from "lodash"
import React from "react"
import { Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"

export const BagItemFragment = gql`
  fragment BagItemProductVariant on ProductVariant {
    product {
      id
      name
      modelSize {
        display
      }
      brand {
        id
        name
      }
      images
      variants {
        id
        internalSize {
          display
        }
      }
    }
  }
`

interface BagItemProps {
  bagItem: any
  index?: number
  sectionHeight: number
  navigation?: any
  removeItemFromBag?: Function
  removeFromBagAndSaveItem?: Function
  hideButtons?: boolean
}

export const BagItem: React.FC<BagItemProps> = ({
  bagItem,
  index,
  sectionHeight,
  navigation,
  removeItemFromBag,
  removeFromBagAndSaveItem,
  hideButtons,
}) => {
  const tracking = useTracking()
  if (!bagItem) {
    return <></>
  }
  const variantToUse = head(
    (get(bagItem, "productVariant.product.variants") || []).filter((a) => a.id === bagItem.productVariant.id)
  )
  const product = get(bagItem, "productVariant.product")
  if (!product) {
    return null
  }

  const imageURL = imageResize(get(product, "images[0].url"), "medium")
  const variantSize = get(variantToUse, "internalSize.display")
  const variantId = bagItem.variantID

  return (
    <Box key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ProductTapped,
            actionType: Schema.ActionTypes.Tap,
            productSlug: product.slug,
            productId: product.id,
          })
          navigation?.navigate("Product", { id: product.id, slug: product.slug })
        }}
      >
        <BagItemContainer flexDirection="row">
          <Flex style={{ flex: 2 }} p={2} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="3" pb={1}>
                {index + 1}
              </Sans>
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
      {!hideButtons && (
        <Flex flexDirection="row" pt={1}>
          <Box flex={1} pr={1}>
            <TouchableOpacity
              onPress={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BagItemRemoved,
                  actionType: Schema.ActionTypes.Tap,
                  productSlug: product.slug,
                  productId: product.id,
                  variantId: variantId,
                })
                removeItemFromBag({
                  variables: {
                    id: variantId,
                    saved: false,
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
                tracking.trackEvent({
                  actionName: Schema.ActionNames.BagItemSaved,
                  actionType: Schema.ActionTypes.Tap,
                  productSlug: product.slug,
                  productId: product.id,
                  variantId: variantId,
                })
                removeFromBagAndSaveItem({
                  variables: {
                    id: variantId,
                    saved: false,
                  },
                })
              }}
            >
              <SaveForLaterButton>
                <Sans size="1" textAlign="center">
                  Save for later
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
  background: ${color("black04")};
  border-radius: 5px;
  height: 48px;
  padding: 11px 8px 8px;
`

const SaveForLaterButton = styled(Box)`
  height: 48px;
  border-radius: 5px;
  border: 1px;
  border-color: #e5e5e5;
  background: transparent;
  padding: 11px 8px 8px;
`

const BagItemContainer = styled(Box)`
  background: ${color("black04")};
  border-radius: 8px;
  overflow: hidden;
  height: 210px;
`

const ImageContainer = styled(FadeInImage)`
  height: 214;
`
