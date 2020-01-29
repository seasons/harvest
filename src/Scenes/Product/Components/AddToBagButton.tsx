import { GET_BAG } from "App/Apollo/Queries"
import { Button } from "App/Components"
import { head } from "lodash"
import React, { useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { ADD_TO_BAG } from "App/Scenes/Bag/Bag"

interface Props {
  productID: string
  disabled?: Boolean
  variantInStock: Boolean
  width: number
  variant: any
  setPopUp: ({ show: boolean, data: any }) => void
}

export const AddToBagButton: React.FC<Props> = props => {
  const [isMutating, setIsMutating] = useState(false)
  const { productID, setPopUp, variantInStock, width, variant } = props
  const { data } = useQuery(GET_BAG)
  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      item: variant.id,
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
        console.log("AddToBagButton.tsx: ", error)

        setPopUp({
          show: true,
          data: {
            title: "Your bag is full",
            note: "Remove one or more items from your bag to continue adding this item.",
            buttonText: "Got It",
          },
        })
      }
    },
  })

  const [removeFromBag] = useMutation(REMOVE_FROM_BAG, {
    variables: {
      item: variant.id,
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
        console.log("AddToBagButton.tsx: ", error)
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
    <Button
      width={width}
      showCheckMark={showCheckMark}
      variant="secondaryLight"
      disabled={disabled}
      size="medium"
      onPress={onPress}
    >
      {text}
    </Button>
  )
}
