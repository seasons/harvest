import { Button } from "App/Components"
import { addItemToBag, addItemToWantItems, removeItemFromWantItems } from "App/Redux/actions"
import gql from "graphql-tag"
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { useMutation, useQuery } from "@apollo/react-hooks"

interface Props {
  bag: any
  productState: any
  productID: string
  displayConfirmation: (type: string) => void
  addItemToBag: (product: any) => void
  removeItemFromWantItems: (product: any) => void
  addItemToWantItems: (product: any) => void
}

const ADD_TO_BAG = gql`
  mutation AddToBag($item: ID!) {
    addToBag(item: $item) {
      id
    }
  }
`

const GET_BAG = gql`
  query GetBag {
    me {
      bag {
        id
        productVariant {
          id
          product {
            id
          }
        }
        position
        saved
      }
      savedItems {
        id
        productVariant {
          id
          product {
            id
          }
        }
        saved
      }
    }
  }
`

export const ReserveButtonComponent: React.FC<Props> = ({
  bag,
  displayConfirmation,
  productID,
  addItemToBag,
  productState,
  removeItemFromWantItems,
  addItemToWantItems,
}) => {
  const { variables, data, loading } = useQuery(GET_BAG)
  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      item: productState.variant.id,
    },
    refetchQueries: [GET_BAG],
  })

  const handleReserve = () => {
    addToBag()
    displayConfirmation("reserve")
  }

  const handleAddWantItem = () => {
    displayConfirmation("want")
  }

  const handleRemoveWantItem = () => {
    removeItemFromWantItems({ productID, variantID: productState.variant.id })
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
  const itemStockZero = productState && productState.variant && productState.variant.stock === 0

  let showCheckMark = false
  let text = "Add to Bag"
  let disabled = false
  let onPress = () => handleReserve()
  if (itemInBag) {
    text = "Added"
    onPress = () => null
    showCheckMark = true
  } else if (itemStockZero || items >= 3) {
    text = "Want"
    onPress = () => handleAddWantItem()
  }

  return (
    <Button
      width={110}
      showCheckMark={showCheckMark}
      variant="primaryGray"
      disabled={disabled}
      size="small"
      onPress={onPress}
    >
      {text}
    </Button>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addItemToBag,
      addItemToWantItems,
      removeItemFromWantItems,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag, productState } = state
  return { bag, productState }
}

export const ReserveButton = connect(mapStateToProps, mapDispatchToProps)(ReserveButtonComponent)
