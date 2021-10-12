import { Button, Flex, Sans } from "App/Components"
import gql from "graphql-tag"
import React, { useState } from "react"
import { Schema, useTracking } from "App/utils/track"
import { Schema as NavigationSchema } from "App/Navigation"
import { TouchableOpacity } from "react-native"
import { GET_PRODUCT } from "App/Scenes/Product/Queries"
import { GET_BROWSE_PRODUCTS } from "App/Scenes/Browse/queries/browseQueries"
import { GetBag_NoCache_Query, REMOVE_FROM_BAG_AND_SAVE_ITEM, SavedTab_Query } from "../../BagQueries"
import { useMutation } from "@apollo/client"
import { BagItemRemoveButton, BagItemRemoveButtonFragment_BagItem } from "./BagItemRemoveButton"
import { PRODUCT_VARIANT_CREATE_DRAFT_ORDER } from "App/Scenes/Product/Mutations"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { useNavigation } from "@react-navigation/native"
import { useAuthContext } from "App/Navigation/AuthContext"

enum OrderType {
  BUY_USED = "Used",
  BUY_NEW = "New",
}

const CANCEL_RETURN = gql`
  mutation CancelReturn {
    cancelReturn {
      id
    }
  }
`

export const BagItemCTAsFragment_BagItem = gql`
  fragment BagItemCTAsFragment_BagItem on BagItem {
    id
    productVariant {
      id
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
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const tracking = useTracking()
  const [removeFromBagAndSaveItem] = useMutation(REMOVE_FROM_BAG_AND_SAVE_ITEM)
  const [cancelReturn] = useMutation(CANCEL_RETURN, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (e) => {
      setIsMutating(false)
    },
  })
  const [createDraftOrder] = useMutation(PRODUCT_VARIANT_CREATE_DRAFT_ORDER, {
    onCompleted: (res) => {
      setIsMutating(false)
      if (res?.createDraftedOrder) {
        navigation.navigate(NavigationSchema.PageNames.Order, { order: res.createDraftedOrder })
      }
    },
    onError: (error) => {
      showPopUp({
        title: "Sorry!",
        note: "There was an issue creating the order, please try again.",
        buttonText: "Okay",
        onClose: () => {
          hidePopUp()
        },
      })
      console.log("error createDraftOrder ", error)
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
      removeFromBagAndSaveItem({
        variables: {
          id: variant.id,
          saved: false,
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: GetBag_NoCache_Query,
          },
          {
            query: SavedTab_Query,
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

  const handleCreateDraftOrder = (orderType: "Used" | "New") => {
    if (isMutating) {
      return
    }
    setIsMutating(true)
    return createDraftOrder({
      variables: {
        input: {
          productVariantID: variant?.id,
          orderType,
        },
      },
    })
  }

  const isBuyNewEnabled = bagItem?.productVariant?.price?.buyNewEnabled
  const isBuyUsedEnabled = bagItem?.productVariant?.price?.buyUsedEnabled
  const buyNewPrice = bagItem?.productVariant?.price?.buyNewPrice
  const buyUsedPrice = bagItem?.productVariant?.price?.buyUsedPrice
  const isBuyable = isBuyNewEnabled || isBuyUsedEnabled
  const purchased = bagItem?.productVariant?.purchased
  const price = isBuyNewEnabled ? buyNewPrice : buyUsedPrice

  const showBuyButton = isBuyable && !purchased && price && userHasSession

  console.log("showBuyButton", showBuyButton)

  const CTAs = () => {
    switch (sectionStatus) {
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
              setIsMutating(true)
              if (isMutating) {
                return
              }
              await cancelReturn({
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
              <Sans size="3">${price / 100} to buy</Sans>
              <Button
                size="small"
                variant="secondaryWhite"
                onPress={() => handleCreateDraftOrder(isBuyUsedEnabled ? OrderType.BUY_USED : OrderType.BUY_NEW)}
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
