import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Spinner } from "App/Components/Spinner"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/queries/browseQueries"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import gql from "graphql-tag"
import { get, head } from "lodash"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { useMutation } from "@apollo/client"

import { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_BAG } from "../BagQueries"
import { Check } from "Assets/svgs"

export const BagItemFragment = gql`
  fragment BagItemProductVariant on ProductVariant {
    product {
      id
      slug
      name
      modelSize {
        id
        display
      }
      brand {
        id
        name
        websiteUrl
      }
      images(size: Thumb) {
        id
        url
      }
      variants {
        id
        reservable
        hasRestockNotification
        reservable
        displayShort
        displayLong
        price {
          id
          retailPrice
        }
      }
    }
    price {
      id
      buyNewPrice
      buyNewEnabled
      buyNewAvailableForSale
      buyUsedAvailableForSale
      buyUsedPrice
      buyUsedEnabled
    }
  }
`

interface BagItemProps {
  bagItem: any
  index?: number
  navigation?: any
  removeItemFromBag?: Function
  removeFromBagAndSaveItem?: Function
  onShowBuyBottomSheet: () => void
}

export const BagItem: React.FC<BagItemProps> = ({
  bagItem,
  index,
  navigation,
  removeItemFromBag,
  removeFromBagAndSaveItem,
  onShowBuyBottomSheet,
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

  // Show buy alert whenever a sellable status is enabled, regardless of underlying availability
  const isBuyable = bagItem?.productVariant?.price?.buyNewEnabled || bagItem?.productVariant?.price?.buyUsedEnabled
  const purchased = bagItem?.productVariant?.purchased

  const variantSize = variantToUse?.displayShort
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

  const onSaveForLater = () => {
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
  }

  const ReservedItemContent = () => {
    return (
      <Flex
        style={{
          flex: 2,
          width: "100%",
        }}
        flexWrap="nowrap"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box style={{ width: "100%" }} p={2}>
          <Sans size="3">{`${index + 1}.`}</Sans>
          <Spacer mb={1} />
          <Sans size="3">{product?.brand?.name}</Sans>
          <Sans size="3" color="black50">
            {product.name}
          </Sans>
          <Sans size="3" color="black50">
            Size {variantSize}
          </Sans>
        </Box>
        <Box p={2}>
          {isBuyable && !purchased && (
            <Button size="small" variant="secondaryWhite" onPress={onShowBuyBottomSheet}>
              Buy
            </Button>
          )}
          {purchased && (
            <Flex flexDirection="row" alignItems="center">
              <Check color={color("black50")} />
              <Spacer mr={1} />
              <Sans size="3" color="black50">
                Purchased
              </Sans>
            </Flex>
          )}
        </Box>
      </Flex>
    )
  }

  const NonReservedItemContent = () => {
    return (
      <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
        <Box>
          <Box style={{ width: "100%" }}>
            <Sans size="3">{`${index + 1}. ${product?.brand?.name}`}</Sans>
            <Sans size="3" color="black50">
              {product.name}
            </Sans>
            <Sans size="3" color="black50">
              Size {variantSize}
            </Sans>
            <Spacer mb={3} />
            {authState.isSignedIn && (
              <TouchableOpacity onPress={onSaveForLater}>
                <Sans size="3" style={{ textDecorationLine: "underline" }}>
                  Save for later
                </Sans>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
        <Flex flexDirection="row" pt={1}>
          <Box>
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
            productName: product.name,
          })
          navigation?.navigate("Product", { id: product.id, slug: product.slug })
        }}
      >
        <Box style={shadowStyles}>
          <BagItemContainer isReserved={isReserved}>
            {isReserved || true ? <ReservedItemContent /> : <NonReservedItemContent />}
            <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
              {!!imageURL && (
                <FadeInImage
                  style={{ height: 216, width: 216 / PRODUCT_ASPECT_RATIO }}
                  resizeMode="contain"
                  source={{ uri: imageURL }}
                />
              )}
            </Flex>
          </BagItemContainer>
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

const BagItemContainer = styled(Flex)<{ isReserved: boolean }>`
  height: 216px;
  overflow: hidden;
  flex-direction: row;
  background-color: ${color("white100")};
  border-color: ${color("black10")};
  border-width: ${(p) => (p.isReserved ? "1px" : "0px")};
  border-radius: ${(p) => (p.isReserved ? "8px" : "0px")};
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
