import { GET_BAG, ADD_TO_BAG, REMOVE_FROM_BAG } from "App/Scenes/Bag/BagQueries"
import { Button } from "App/Components"
import { head } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { GreenCheck } from "Assets/svgs"

interface Props {
  productID: string
  disabled?: Boolean
  variantInStock: Boolean
  width: number
  selectedVariant: any
  setPopUp: ({ show: boolean, data: any }) => void
  navigation: any
}

export const AddToBagButton: React.FC<Props> = props => {
  const [isMutating, setIsMutating] = useState(false)
  const { productID, setPopUp, variantInStock, width, selectedVariant, navigation } = props
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
        setPopUp({
          show: true,
          data: {
            icon: <GreenCheck />,
            title: "Added to bag",
            note: "Your bag is full. Place your reservation.",
            buttonText: "Got It",
            secondaryButtonText: "Go to bag",
            secondaryButtonOnPress: () => {
              setPopUp({ show: false, data: null })
              navigation.popToTop()
              navigation.navigate("Bag")
            },
            onClose: () => setPopUp({ show: false, data: null }),
          },
        })
      }
    },
    onError: err => {
      setIsMutating(false)
      if (err && err.graphQLErrors) {
        setPopUp({
          show: true,
          data: {
            title: "Your bag is full",
            note: "Remove one or more items from your bag to continue adding this item.",
            buttonText: "Got It",
            onClose: () => setPopUp({ show: false, data: null }),
          },
        })
      }
    },
  })

  const [removeFromBag] = useMutation(REMOVE_FROM_BAG, {
    variables: {
      item: selectedVariant.id,
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: err => {
      setIsMutating(false)
      if (err && err.graphQLErrors) {
        const error = head(err.graphQLErrors)
        console.error("AddToBagButton.tsx: ", error)
      }
    },
  })

  const handleReserve = () => {
    if (!isMutating) {
      setIsMutating(true)
      addToBag()
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

  let showCheckMark = false
  let text = "Add to Bag"
  let disabled = !!props.disabled || false
  let onPress = () => handleReserve()

  if (itemInBag) {
    text = "Added"
    onPress = () => {
      if (!isMutating) {
        setIsMutating(true)
        removeFromBag()
      }
    }
    showCheckMark = true
  } else if (!variantInStock) {
    disabled = true
  }

  return (
    <Button width={width} showCheckMark={showCheckMark} variant="primaryBlack" disabled={disabled} onPress={onPress}>
      {text}
    </Button>
  )
}
