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
  productID: string
  disabled?: Boolean
  variantInStock: Boolean
  width: number
  selectedVariant: any
}

export const AddToBagButton: React.FC<Props> = props => {
  const [isMutating, setIsMutating] = useState(false)
  const { productID, variantInStock, width, selectedVariant } = props
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const userHasSession = authState?.userSession

  const { data } = useQuery(GET_BAG)

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

  const items =
    (data &&
      data.me &&
      data.me.bag.map(item => ({
        variantID: item.productVariant.id,
        productID: item.productVariant.product.id,
      }))) ||
    []

  const itemInBag = !!items.find(item => item.productID === productID)

  const disabled = !!props.disabled || itemInBag || !variantInStock

  let text = "Add to Bag"
  if (itemInBag) {
    text = "Added"
  }

  return (
    <Button
      width={width}
      loading={isMutating}
      showCheckMark={itemInBag}
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
