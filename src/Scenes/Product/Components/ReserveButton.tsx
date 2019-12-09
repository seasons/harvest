import { Button } from "App/Components"
import { addItemToBag, addItemToWantItems, removeItemFromWantItems } from "App/Redux/actions"
import gql from "graphql-tag"
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { useMutation } from "@apollo/react-hooks"

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
    addToBag(item: $item)
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
  const [addToBag, { data }] = useMutation(ADD_TO_BAG, {
    variables: {
      item: productState.variant.id,
    },
  })

  const handleReserve = () => {
    addItemToBag({ productID, variantID: productState.variant.id })
    addToBag()
    displayConfirmation("reserve")
  }

  const handleAddWantItem = () => {
    addItemToWantItems({ productID, variantID: productState.variant.id })
    displayConfirmation("want")
  }

  const handleRemoveWantItem = () => {
    removeItemFromWantItems({ productID, variantID: productState.variant.id })
  }

  const itemInBag = !!bag.items.find(item => item.productID === productID)
  const itemInWantList = !!bag.wantItems.find(item => item.productID === productID)
  const itemStockZero = productState && productState.variant && productState.variant.stock === 0

  let showCheckMark = false
  let text = "Add to Bag"
  let onPress = () => handleReserve()
  if (itemInBag) {
    text = "Added"
    onPress = () => null
    showCheckMark = true
  } else if (itemStockZero && itemInWantList) {
    text = "Want"
    onPress = () => handleRemoveWantItem()
    showCheckMark = true
  } else if (itemStockZero || bag.itemCount >= 3) {
    onPress = () => handleAddWantItem()
    text = "Want"
  }

  return (
    <Button
      width={110}
      showCheckMark={showCheckMark}
      variant="primaryGray"
      disabled={itemInBag}
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
