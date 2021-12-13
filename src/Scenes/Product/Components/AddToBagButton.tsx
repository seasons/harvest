import { Button } from "App/Components"
import { GetProduct } from "App/generated/GetProduct"
import { GetProductMe } from "App/generated/GetProductMe"
import { BORDER_RADIUS, MAXIMUM_ITEM_COUNT } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_LOCAL_BAG } from "App/queries/clientQueries"
import { ADD_TO_BAG, DELETE_BAG_ITEM, GetBag_NoCache_Query } from "App/Scenes/Bag/BagQueries"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import { head } from "lodash"
import React, { useState } from "react"

import { useMutation, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"

import { GET_PRODUCT } from "../Queries"
import { useBag } from "App/Scenes/Bag/useBag"

interface Props {
  setShowSizeWarning: (show: boolean) => void
  disabled?: Boolean
  variantInStock: Boolean
  width?: number
  selectedVariant: any
  data: GetProduct
  dataMe: GetProductMe
}

export const AddToBagButton: React.FC<Props> = ({
  dataMe,
  variantInStock,
  width,
  selectedVariant,
  data,
  setShowSizeWarning,
  disabled,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [added, setAdded] = useState(false)
  const { bagSections } = useBag()
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const isUserSignedIn = authState?.isSignedIn
  const me = dataMe?.me

  const { data: localItems } = useQuery(GET_LOCAL_BAG)
  const [removeFromLocalBag] = useMutation(ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      id: selectedVariant.id,
      productID: data.products?.[0].id,
      variantID: selectedVariant.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      {
        query: GET_PRODUCT,
        variables: { where: { id: head(data?.products)?.id } },
      },
    ],
  })
  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: () => {
      setIsMutating(false)
    },
  })
  const [addToBag] = useMutation(isUserSignedIn ? ADD_TO_BAG : ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      id: selectedVariant.id,
      productID: data.products?.[0].id,
      variantID: selectedVariant.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetBag_NoCache_Query,
      },
      {
        query: GET_PRODUCT,
        variables: { where: { id: head(data?.products)?.id } },
      },
    ],
    onCompleted: (res) => {
      setIsMutating(false)
      setAdded(true)
      const bagItemCount = isUserSignedIn ? me?.bag?.length : res.addOrRemoveFromLocalBag.length
      if (bagItemCount && bagItemCount >= MAXIMUM_ITEM_COUNT) {
        showPopUp({
          icon: <CheckCircled />,
          title: "Added to bag",
          note: "Your bag is full. Place your reservation.",
          buttonText: "Got It",
          secondaryButtonText: "Go to bag",
          secondaryButtonOnPress: () => {
            navigation.navigate("BagStack")
            hidePopUp()
          },
          onClose: () => hidePopUp(),
        })
      }
    },
    onError: (err) => {
      setIsMutating(false)
      if (err && err.graphQLErrors) {
        console.log("error SizeWarning.tsx ", err)
        if (err.toString().includes("already in bag")) {
          showPopUp({
            title: "Item is already in your bag",
            note: "Looks like you've already added it!",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        } else if (err.toString().includes("Bag is full")) {
          showPopUp({
            title: "Your bag is full",
            note: "Remove one or more items from your bag to continue adding this item.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        } else {
          showPopUp({
            title: "Oops, sorry!",
            note: "An unexpected error occurred, please try again.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        }
      }
    },
  })

  const handleReserve = () => {
    if (!isMutating) {
      setIsMutating(true)

      const productFit = data?.products?.[0].productFit
      const runsBig = !!productFit && productFit === "RunsBig"
      const runsSmall = !!productFit && productFit === "RunsSmall"

      if (!runsBig && !runsSmall) {
        console.log("1")
        addToBag()
      } else {
        setShowSizeWarning(true)
        setIsMutating(false)
      }
    }
  }

  const isInBag = isUserSignedIn
    ? selectedVariant?.isInBag || added
    : !!localItems?.localBagItems?.find((item) => item.variantID === selectedVariant.id) || false
  const _disabled = !!disabled || (!variantInStock && !isInBag) || isMutating
  const inCart = selectedVariant?.isInCart

  let text = "Add to bag"
  if (isInBag && !inCart) {
    text = "Remove"
  }

  return (
    <Button
      width={width}
      loading={isMutating}
      showCheckMark={isInBag}
      variant={isInBag ? "primaryGray" : "primaryBlack"}
      disabled={_disabled}
      borderRadius={BORDER_RADIUS}
      onPress={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductAddedToBag,
          actionType: Schema.ActionTypes.Tap,
        })
        if (!isInBag) {
          handleReserve()
        } else {
          if (isMutating) {
            return
          }
          setIsMutating(true)

          if (isUserSignedIn) {
            const addedItems = bagSections?.find((section) => section.status === "Added")?.bagItems
            const bagItem = addedItems.find((item) => item.productVariant.id === selectedVariant.id)

            deleteBagItem({
              variables: {
                itemID: bagItem?.id,
              },
              refetchQueries: [
                {
                  query: GetBag_NoCache_Query,
                },
                {
                  query: GET_PRODUCT,
                  variables: {
                    where: {
                      id: bagItem.productVariant?.product?.id,
                    },
                  },
                },
              ],
            })
          } else {
            removeFromLocalBag()
          }
        }
      }}
    >
      {text}
    </Button>
  )
}
