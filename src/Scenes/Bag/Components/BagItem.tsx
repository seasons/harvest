import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Spinner } from "App/Components/Spinner"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/Browse"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get, head } from "lodash"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { useMutation } from "@apollo/react-hooks"

import { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_BAG } from "../BagQueries"

export const BagItemFragment = gql`
  fragment BagItemProductVariant on ProductVariant {
    product {
      id
      name
      modelSize {
        id
        display
      }
      brand {
        id
        name
      }
      images(size: Thumb) {
        id
        url
      }
      variants {
        id
        reservable
        internalSize {
          id
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
  const { authState } = useAuthContext()
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
  const imageURL = product?.images?.[0]?.url || ""

  const variantSize = get(variantToUse, "internalSize.display")
  const variantId = bagItem.variantID

  const [removeFromLocalBag] = useMutation(ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      productID: product.id,
      variantID: variantToUse.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: GET_PRODUCT,
        variables: { where: { id: product.id } },
      },
    ],
  })

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
            {authState.isSignedIn && (
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
                      refetchQueries: [
                        {
                          query: GET_BAG,
                        },
                        {
                          query: GET_PRODUCT,
                          variables: {
                            where: {
                              id: product.id,
                            },
                          },
                        },
                        {
                          query: GET_BROWSE_PRODUCTS,
                          variables: {
                            name: "all",
                            first: 10,
                            skip: 0,
                            orderBy: "publishedAt_DESC",
                            sizes: [],
                          },
                        },
                      ],
                    })
                  }
                }}
              >
                <Sans size="1" style={{ textDecorationLine: "underline" }}>
                  Save for later
                </Sans>
              </TouchableOpacity>
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
                  if (!authState.isSignedIn) {
                    removeFromLocalBag()
                  } else {
                    removeItemFromBag({
                      variables: {
                        id: variantId,
                        saved: false,
                      },
                      refetchQueries: [
                        {
                          query: GET_BAG,
                        },
                        {
                          query: GET_PRODUCT,
                          variables: {
                            where: {
                              id: product.id,
                            },
                          },
                        },
                      ],
                    })
                  }
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
                <ImageContainer
                  style={{ height: 170 * PRODUCT_ASPECT_RATIO, width: 170 }}
                  resizeMode="contain"
                  source={{ uri: imageURL }}
                />
              )}
            </Flex>
          </BagItemContainer>
          <Spacer mb={isReserved ? 1 : 2} />
        </Box>
      </TouchableWithoutFeedback>
      {isMutating && (
        <Overlay>
          <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        </Overlay>
      )}
    </Box>
  )
}

const BagItemContainer = styled(Box)<{ isReserved: boolean }>`
  height: 216px;
  overflow: hidden;
  background-color: ${color("white100")};
  border-color: ${color("black10")};
  border-width: ${(p) => (p.isReserved ? "1px" : "0px")};
  border-radius: ${(p) => (p.isReserved ? "8px" : "0px")};
`

const ImageContainer = styled(FadeInImage)`
  height: 214;
`

const Overlay = styled(Box)`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`
