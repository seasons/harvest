import { Box, Button, Flex, Sans, Spacer } from "App/Components"
import { FadeInImage } from "App/Components/FadeInImage"
import { Spinner } from "App/Components/Spinner"
import { PRODUCT_ASPECT_RATIO } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/queries/browseQueries"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { color } from "App/utils"
import { Schema, useTracking } from "App/utils/track"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { Check } from "Assets/svgs"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_BAG } from "../BagQueries"

export const BagItemFragment_ProductVariant = gql`
  fragment BagItemFragment_ProductVariant on ProductVariant {
    id
    purchased
    displayShort
    product {
      id
      slug
      name
      brand {
        id
        name
      }
      images(size: Thumb) {
        id
        url
      }
    }
    price {
      id
      buyNewEnabled
      buyUsedEnabled
    }
  }
`

export const BagItemFragment_BagItem = gql`
  fragment BagItemFragment_BagItem on BagItem {
    id
    status
    productVariant {
      ...BagItemFragment_ProductVariant
    }
  }
  ${BagItemFragment_ProductVariant}
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
  const product = bagItem?.productVariant?.product

  if (!product) {
    return null
  }

  const variant = bagItem?.productVariant
  const isReserved = bagItem.status !== "Added"
  const imageURL = product?.images?.[0]?.url || ""

  // Show buy alert whenever a sellable status is enabled, regardless of underlying availability
  const isBuyable = variant?.price?.buyNewEnabled || variant?.price?.buyUsedEnabled
  const purchased = variant?.purchased

  const variantSize = variant?.displayShort
  const variantID = variant?.id

  const [removeFromLocalBag] = useMutation(ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      productID: product.id,
      variantID,
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
        variantId: variantID,
      })
      removeFromBagAndSaveItem({
        variables: {
          id: variantID,
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
                  variantId: variantID,
                })
                if (!authState.isSignedIn) {
                  removeFromLocalBag()
                } else {
                  removeItemFromBag({
                    variables: {
                      id: variantID,
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
            {isReserved ? <ReservedItemContent /> : <NonReservedItemContent />}
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
