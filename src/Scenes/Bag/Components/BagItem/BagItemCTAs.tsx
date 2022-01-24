import { Button, Flex, Sans } from "App/Components"
import gql from "graphql-tag"
import React, { useState } from "react"
import { Schema, useTracking } from "App/utils/track"
import { TouchableOpacity } from "react-native"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/queries/browseQueries"
import { GetBag_NoCache_Query } from "../../BagQueries"
import { useMutation } from "@apollo/client"
import { BagItemRemoveButton, BagItemRemoveButtonFragment_BagItem } from "./BagItemRemoveButton"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { useAuthContext } from "App/Navigation/AuthContext"
import { SAVE_ITEM } from "@seasons/eclipse/src/components/SaveProductButton/queries"
import { UPSERT_CART_ITEM } from "App/Scenes/Product/Product"
import { useNavigation } from "@react-navigation/native"

const CANCEL_RETURN = gql`
  mutation CancelReturn($bagItemId: ID!) {
    cancelReturn(bagItemId: $bagItemId) {
      id
    }
  }
`

export const BagItemCTAsFragment_BagItem = gql`
  fragment BagItemCTAsFragment_BagItem on BagItem {
    id
    productVariant {
      id
      isInCart
      purchased
      price {
        id
        buyNewEnabled
        buyUsedEnabled
        buyUsedPrice
        buyNewPrice
      }
      product {
        id
        slug
      }
    }
    ...BagItemRemoveButtonFragment_BagItem
  }
  ${BagItemRemoveButtonFragment_BagItem}
`

export const BagItemCTAs = ({ bagItem, sectionStatus, size }) => {
  const isLarge = size === "large"
  const [isMutating, setIsMutating] = useState(false)
  const { authState } = useAuthContext()
  const tracking = useTracking()
  const navigation = useNavigation()
  const { showPopUp, hidePopUp } = usePopUpContext()

  const [saveItem] = useMutation(SAVE_ITEM)
  const [cancelReturn] = useMutation(CANCEL_RETURN, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (e) => {
      setIsMutating(false)
    },
  })

  const userHasSession = !!authState?.userSession
  const variant = bagItem?.productVariant
  const product = variant?.product

  const onSaveForLater = () => {
    if (!isMutating) {
      setIsMutating(true)
      tracking.trackEvent({
        actionName: Schema.ActionNames.BagItemSaved,
        actionType: Schema.ActionTypes.Tap,
        productSlug: product.slug,
        productId: product.id,
        variantId: variant.id,
      })
      saveItem({
        variables: {
          item: bagItem.id,
          save: true,
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GetBag_NoCache_Query,
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
              categoryName: "all",
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

  const [upsertCartItem] = useMutation(UPSERT_CART_ITEM, {
    variables: {
      productVariantId: variant?.id,
      addToCart: !variant?.isInCart,
    },
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (error) => {
      setIsMutating(false)
    },
  })

  const isBuyNewEnabled = variant?.price?.buyNewEnabled
  const isBuyUsedEnabled = variant?.price?.buyUsedEnabled
  const isBuyable = isBuyNewEnabled || isBuyUsedEnabled
  const purchased = variant?.purchased
  const price = variant?.price?.buyUsedAdjustedPrice / 100

  const showBuyButton = isBuyable && !purchased && price && userHasSession

  const CTAs = () => {
    switch (sectionStatus) {
      case "Cart":
      case "Added":
        return (
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" alignItems="center" width="100%">
            <TouchableOpacity onPress={onSaveForLater}>
              <Sans size="3" style={{ textDecorationLine: "underline" }}>
                Save for later
              </Sans>
            </TouchableOpacity>
            <BagItemRemoveButton bagItem={bagItem} />
          </Flex>
        )
      case "ReturnPending":
        return (
          <TouchableOpacity
            onPress={async () => {
              if (isMutating) {
                return
              }
              setIsMutating(true)
              await cancelReturn({
                variables: {
                  bagItemId: bagItem.id,
                },
                awaitRefetchQueries: true,
                refetchQueries: [{ query: GetBag_NoCache_Query }],
              })
            }}
          >
            <Sans size="3" style={{ textDecorationLine: "underline" }}>
              Cancel return
            </Sans>
          </TouchableOpacity>
        )
      default:
        if (showBuyButton) {
          return (
            <Flex
              flexDirection={isLarge ? "column" : "row"}
              flexWrap="nowrap"
              justifyContent="space-between"
              alignItems={isLarge ? "flex-start" : "center"}
              width="100%"
              height="100%"
            >
              <Sans size="3">${price} to buy</Sans>
              <Button
                size="small"
                variant="secondaryWhite"
                loading={isMutating}
                onPress={() => {
                  if (isMutating) {
                    return
                  }
                  if (userHasSession) {
                    setIsMutating(true)
                    upsertCartItem()
                  } else {
                    showPopUp({
                      title: "Sign up to add to cart",
                      note: "You must be a member to use this feature.",
                      secondaryButtonText: "Got it",
                      secondaryButtonOnPress: () => {
                        hidePopUp()
                      },
                      buttonText: "Sign up",
                      onClose: () => {
                        hidePopUp()
                        navigation.navigate("Modal", {
                          screen: "CreateAccountModal",
                        })
                      },
                    })
                  }
                }}
              >
                Buy
              </Button>
            </Flex>
          )
        } else {
          return null
        }
    }
  }

  return (
    <Flex height={isLarge ? 80 : 35} width="100%">
      <CTAs />
    </Flex>
  )
}
