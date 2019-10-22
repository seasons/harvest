import React from "react"
import { Button } from "App/Components"
import { addItemToBag } from "App/Redux/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

interface Props {
  bag: any
  productState: any
  productID: string
  displayReserveConfirmation: () => void
  addItemToBag: (product: any) => void
}

export const ReserveButtonComponent: React.FC<Props> = ({
  bag,
  displayReserveConfirmation,
  productID,
  addItemToBag,
  productState,
}) => {
  const handleReserve = itemInBag => {
    if (itemInBag) {
      return
    }
    addItemToBag({ productID, variantID: productState.variantID })
    displayReserveConfirmation()
  }

  const itemInBag = !!bag.items.find(item => item.productID === productID)

  const text = itemInBag ? "Added" : "Reserve"

  return (
    <Button variant="primaryLight" disabled={itemInBag} size="small" onPress={() => handleReserve(itemInBag)}>
      {text}
    </Button>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addItemToBag,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag, productState } = state
  return { bag, productState }
}

export const ReserveButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReserveButtonComponent)
