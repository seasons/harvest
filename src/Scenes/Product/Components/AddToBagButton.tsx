import { GET_BAG } from "App/Apollo/Queries"
import { Button } from "App/Components"
import { togglePopUp } from "App/Redux/actions"
import gql from "graphql-tag"
import { head } from "lodash"
import React, { useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { useMutation, useQuery } from "@apollo/react-hooks"

interface Props {
  productState: any
  productID: string
  addItemToBag: (product: any) => void
  removeItemFromWantItems: (product: any) => void
  addItemToWantItems: (product: any) => void
  togglePopUp: (show: boolean, data: any) => void
  disabled?: Boolean
  variantInStock: Boolean
  width: number
}

const ADD_TO_BAG = gql`
  mutation AddToBag($item: ID!) {
    addToBag(item: $item) {
      id
    }
  }
`

const REMOVE_FROM_BAG = gql`
  mutation RemoveFromBag($item: ID!) {
    removeFromBag(item: $item) {
      id
    }
  }
`

export const AddToBagButtonComponent: React.FC<Props> = props => {
  const [isMutating, setIsMutating] = useState(false)
  const { productID, productState, togglePopUp, variantInStock, width } = props
  const { data } = useQuery(GET_BAG)
  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      item: productState.variant.id,
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

        togglePopUp(true, {
          title: "Your bag is full",
          note: "Remove one or more items from your bag to continue adding this item.",
          buttonText: "Got It",
        })
      }
    },
  })

  const [removeFromBag] = useMutation(REMOVE_FROM_BAG, {
    variables: {
      item: productState.variant.id,
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      togglePopUp,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag, productState } = state
  return { bag, productState }
}

export const AddToBagButton = connect(mapStateToProps, mapDispatchToProps)(AddToBagButtonComponent)
