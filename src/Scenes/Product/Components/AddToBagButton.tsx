import { Button } from "App/Components"
import { GetProduct } from "App/generated/GetProduct"
import { DEFAULT_ITEM_COUNT } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import {
  ADD_OR_REMOVE_FROM_LOCAL_BAG, ADD_TO_BAG, GET_BAG, GET_LOCAL_BAG
} from "App/Scenes/Bag/BagQueries"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import { head } from "lodash"
import React, { useState } from "react"

import { useMutation, useQuery } from "@apollo/react-hooks"
import { useNavigation } from "@react-navigation/native"

import { GET_PRODUCT } from "../Queries"

interface Props {
  disabled?: Boolean
  variantInStock: Boolean
  width: number
  selectedVariant: any
  data: GetProduct
  products
}

export const AddToBagButton: React.FC<Props> = (props) => {
  const [isMutating, setIsMutating] = useState(false)
  const [added, setAdded] = useState(false)
  const { variantInStock, width, selectedVariant, data } = props
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const isUserSignedIn = authState?.isSignedIn

  const { data: localItems } = useQuery(GET_LOCAL_BAG)
  const [addToBag] = useMutation(isUserSignedIn ? ADD_TO_BAG : ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      id: selectedVariant.id,
      productID: props.data.products?.[0].id,
      variantID: selectedVariant.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: GET_PRODUCT,
        variables: { where: { id: head(data?.products)?.id } },
      },
    ],
    onCompleted: (res) => {
      console.log(res)
      setIsMutating(false)
      setAdded(true)
      const itemCount = data?.me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
      const bagItemCount = authState?.isSignedIn ? data?.me?.bag?.length : res.addOrRemoveFromLocalBag.length
      console.log("itemCount", itemCount)
      console.log("bagItemCount", bagItemCount)
      console.log("data?.me?.bag", data?.me?.bag)
      if (itemCount && bagItemCount && bagItemCount >= itemCount) {
        showPopUp({
          icon: <CheckCircled />,
          title: "Added to bag",
          note: "Your bag is full. Place your reservation.",
          buttonText: "Got It",
          secondaryButtonText: "Go to bag",
          secondaryButtonOnPress: () => {
            navigation.popToTop()
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
        showPopUp({
          title: "Your bag is full",
          note: "Remove one or more items from your bag to continue adding this item.",
          buttonText: "Got It",
          onClose: () => hidePopUp(),
        })
      }
    },
  })

  const handleReserve = () => {
    if (!isMutating) {
      setIsMutating(true)
      addToBag()
    }
  }

  const isInBag = isUserSignedIn
    ? selectedVariant?.isInBag || added
    : !!localItems.localBagItems.find((item) => item.variantID === selectedVariant.id)
  const disabled = !!props.disabled || isInBag || !variantInStock || isMutating

  let text = "Add to bag"
  if (isInBag) {
    text = "Added"
  }

  return (
    <Button
      width={width}
      loading={isMutating}
      showCheckMark={isInBag}
      variant="primaryBlack"
      disabled={disabled}
      onPress={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductAddedToBag,
          actionType: Schema.ActionTypes.Tap,
        })
        handleReserve()
      }}
    >
      {text}
    </Button>
  )
}
