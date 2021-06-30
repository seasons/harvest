import { Button } from "App/Components"
import { GetProduct } from "App/generated/GetProduct"
import { DEFAULT_ITEM_COUNT } from "App/helpers/constants"
import { useAuthContext } from "App/Navigation/AuthContext"
import { usePopUpContext } from "App/Navigation/ErrorPopUp/PopUpContext"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_LOCAL_BAG } from "App/queries/clientQueries"
import { ADD_TO_BAG, GetBag_NoCache_Query } from "App/Scenes/Bag/BagQueries"
import { Schema, useTracking } from "App/utils/track"
import { CheckCircled } from "Assets/svgs"
import { head } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { GET_PRODUCT } from "../Queries"
import { Schema as NavigationSchema } from "App/Navigation"
import { GetProductMe } from "App/generated/GetProductMe"

interface Props {
  setShowSizeWarning: (show: boolean) => void
  disabled?: Boolean
  variantInStock: Boolean
  width: number
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
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const navigation = useNavigation()
  const { authState } = useAuthContext()
  const isUserSignedIn = authState?.isSignedIn
  const me = dataMe?.me

  const { data: localItems } = useQuery(GET_LOCAL_BAG)
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
      const itemCount = me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
      const bagItemCount = authState?.isSignedIn ? me?.bag?.length : res.addOrRemoveFromLocalBag.length
      if (itemCount && bagItemCount && bagItemCount >= itemCount && isUserSignedIn) {
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
          if (dataMe?.me?.bag?.length < 6) {
            showPopUp({
              title: "Want another item?",
              note: "Upgrade your plan to add more slots",
              buttonText: "Upgrade plan",
              onClose: () => {
                navigation.navigate(NavigationSchema.StackNames.Modal, {
                  screen: NavigationSchema.PageNames.UpdatePaymentPlanModal,
                })
                hidePopUp()
              },
              secondaryButtonText: "Got It",
              secondaryButtonOnPress: () => {
                hidePopUp()
              },
            })
          } else {
            showPopUp({
              title: "Your bag is full",
              note: "Remove one or more items from your bag to continue adding this item.",
              buttonText: "Got It",
              onClose: () => hidePopUp(),
            })
          }
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
  const _disabled = !!disabled || isInBag || !variantInStock || isMutating

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
      disabled={_disabled}
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
