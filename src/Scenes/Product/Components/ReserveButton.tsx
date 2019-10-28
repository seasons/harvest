import React from "react"
import { Button } from "App/Components"
import { addItemToBag, toggleReserveConfirmation } from "App/Redux/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Size } from "App/Navigation/SizePicker"

interface Props {
  productID: string
  addItemToBag: (product: any) => void
  variant: Size
}

export const ReserveButtonComponent: React.FC<Props> = ({ addItemToBag, variant, productID }) => {
  return (
    <Button
      variant="primaryLight"
      size="small"
      onPress={() => {
        addItemToBag({ productID, variantID: variant.id })
        toggleReserveConfirmation(true)

        setTimeout(() => {
          toggleReserveConfirmation(false)
        }, 2000)
      }}
    >
      Reserve
    </Button>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addItemToBag,
      toggleReserveConfirmation,
    },
    dispatch
  )

export const ReserveButton = connect(
  null,
  mapDispatchToProps
)(ReserveButtonComponent)
