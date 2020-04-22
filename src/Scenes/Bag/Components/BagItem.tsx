import { Box, Flex, Sans, Button, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { imageResize } from "App/helpers/imageResize"
import { Schema, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get, head } from "lodash"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import { color } from "App/utils"
import { Spinner } from "App/Components/Spinner"

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
  navigation?: any
  removeItemFromBag?: Function
  removeFromBagAndSaveItem?: Function
}

export const BagItem: React.FC<BagItemProps> = ({
  bagItem,
  index,
  navigation,
  removeItemFromBag,
  removeFromBagAndSaveItem,
}) => {
  const [isMutating, setIsMutating] = useState(false)
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

  const isReserved = bagItem.status !== "Added"

  const imageURL = imageResize(get(product, "images[0].url"), "medium")
  const variantSize = get(variantToUse, "internalSize.display")
  const variantId = bagItem.variantID

  const ReservedItemContent = () => {
    return (
      <Flex
        style={{
          flex: 2,
          width: "100%",
        }}
        flexWrap="nowrap"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Box style={{ width: "100%" }} p={2}>
          <Sans size="1">{`${index + 1}.`}</Sans>
          <Spacer mb={1} />
          <Sans size="1">{product?.brand?.name}</Sans>
          <Sans size="1" color="black50">
            {product.name}
          </Sans>
          <Sans size="1" color="black50">
            Size {variantSize}
          </Sans>
        </Box>
      </Flex>
    )
  }

  const NonReservedItemContent = () => {
    return (
      <Flex style={{ flex: 2, width: "100%" }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
        <Box>
          <Box style={{ width: "100%" }}>
            <Sans size="1">{`${index + 1}. ${product?.brand?.name}`}</Sans>
            <Sans size="1" color="black50">
              {product.name}
            </Sans>
            <Sans size="1" color="black50">
              Size {variantSize}
            </Sans>
            <Spacer mb={3} />
            {!isMutating ? (
              <TouchableOpacity
                onPress={() => {
                  if (!isMutating) {
                    setIsMutating(true)
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
                  }
                }}
              >
                <Sans size="1" style={{ textDecorationLine: "underline" }}>
                  Save for later
                </Sans>
              </TouchableOpacity>
            ) : (
              <Flex style={{ width: 100, height: 20 }} alignItems="center" flexDirection="row" justifyContent="center">
                <Spinner />
              </Flex>
            )}
          </Box>
        </Box>
        {!isReserved && (
          <Flex flexDirection="row" pt={1}>
            <Box flex={1}>
              <Button
                size="small"
                variant="secondaryWhite"
                disabled={isMutating}
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
    )
  }

  const shadowStyles = isReserved
    ? {
        shadowColor: "black",
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        elevation: 1,
      }
    : {}

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
        <Box style={shadowStyles}>
          <BagItemContainer isReserved={isReserved} flexDirection="row">
            {isReserved ? <ReservedItemContent /> : <NonReservedItemContent />}
            <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
              {!!imageURL && (
                <ImageContainer style={{ height: 216, width: 170 }} resizeMode="contain" source={{ uri: imageURL }} />
              )}
            </Flex>
          </BagItemContainer>
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  )
}

const BagItemContainer = styled(Box)<{ isReserved: boolean }>`
  height: 216px;
  overflow: hidden;
  background-color: ${color("white100")};
  border-color: ${color("black15")};
  border-width: ${(p) => (p.isReserved ? "1px" : "0px")};
  border-radius: ${(p) => (p.isReserved ? "8px" : "0px")};
`

const ImageContainer = styled(FadeInImage)`
  height: 214;
`
