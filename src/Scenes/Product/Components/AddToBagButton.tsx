import { Button } from "App/Components"
import { ADD_TO_BAG, GET_BAG } from "App/Scenes/Bag/BagQueries"
import { GreenCheck } from "Assets/svgs"
import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { useNavigation } from "@react-navigation/native"
import { useAuthContext } from "App/Navigation/AuthContext"
import { useTracking, Schema } from "App/utils/track"
import { usePopUpContext } from "App/Navigation/PopUp/PopUpContext"

interface Props {
  disabled?: Boolean
  variantInStock: Boolean
  width: number
  selectedVariant: any
}

export const AddToBagButton: React.FC<Props> = props => {
  const [isMutating, setIsMutating] = useState(false)
  const { variantInStock, width, selectedVariant } = props
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const userHasSession = authState?.userSession

  const { data } = useQuery(GET_BAG)

  console.log("selectedVariant", selectedVariant)

  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      id: selectedVariant.id,
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)

      if (data?.me?.bag?.length >= 2) {
        showPopUp({
          icon: <GreenCheck />,
          title: "Added to bag",
          note: "Your bag is full. Place your reservation.",
          buttonText: "Got It",
          secondaryButtonText: "Go to bag",
          secondaryButtonOnPress: () => {
            hidePopUp()
            navigation.popToTop()
            navigation.navigate("BagStack")
          },
          onClose: () => hidePopUp(),
        })
      }
    },
    onError: err => {
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

  const isInBag = selectedVariant?.isInBag
  const disabled = !!props.disabled || isInBag || !variantInStock

  let text = "Add to Bag"
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
