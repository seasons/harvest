import { Button } from "App/Components"
import { GetProduct } from "App/generated/GetProduct"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"
import { ADD_TO_BAG, GET_BAG } from "App/Scenes/Bag/BagQueries"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import { head } from "lodash"
import React, { useState } from "react"

import { useMutation } from "@apollo/react-hooks"
import { useNavigation } from "@react-navigation/native"

import { GET_PRODUCT } from "../Queries"

interface Props {
  disabled?: Boolean
  variantInStock: Boolean
  width: number
  selectedVariant: any
  data: GetProduct
}

export const AddToBagButton: React.FC<Props> = (props) => {
  const [isMutating, setIsMutating] = useState(false)
  const [added, setAdded] = useState(false)
  const { variantInStock, width, selectedVariant, data } = props
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const userHasSession = authState?.userSession

  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      id: selectedVariant.id,
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: GET_PRODUCT,
        variables: { where: { id: head(data?.products)?.id } },
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      setAdded(true)
      if (data?.me?.bag?.length >= 2) {
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
      if (userHasSession) {
        setIsMutating(true)
        addToBag()
      } else {
        navigation.navigate("Modal", { screen: "SignInModal" })
      }
    }
  }

  const noActiveUser = data?.me?.customer?.status !== "Active"

  const isInBag = selectedVariant?.isInBag || added
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
