import { Box, Flex, Sans, Button, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Schema, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get, head } from "lodash"
import React from "react"
import { Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { SaveProductButton } from "App/Scenes/Product/Components"
import { SaveIcon } from "Assets/icons"

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
    return null
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
          <Flex
            style={{ flex: 2, width: "100%" }}
            flexWrap="nowrap"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Box style={{ width: "100%" }}>
                <Sans size="1">{`${index + 1}. ${product?.brand?.name}`}</Sans>
                <Sans size="1" color="gray">
                  {product.name}
                </Sans>
                <Sans size="1" color="gray">
                  Size {variantSize}
                </Sans>
                <Spacer mb={3} />
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
                  <Sans size="1" style={{ textDecorationLine: "underline" }}>
                    Save for later
                  </Sans>
                </TouchableOpacity>
              </Box>
            </Box>
            {!hideButtons && (
              <Flex flexDirection="row" pt={1}>
                <Box flex={1}>
                  <Button
                    size="small"
                    variant="secondaryWhite"
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
                    Remove
                  </Button>
                </Box>
              </Flex>
            )}
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
    </Box>
  )
}

const BagItemContainer = styled(Box)`
  overflow: hidden;
  height: 216px;
`

const ImageContainer = styled(FadeInImage)`
  height: 214;
`
