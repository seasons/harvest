import React from "react"
import { Button } from "App/Components"
import { addItemToBag } from "App/Redux/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

interface Props {
  product: any
  addItemToBag: (product: any) => void
  displayReserveConfirmation: () => void
}

export const ReserveButtonComponent: React.FC<Props> = ({ product, addItemToBag }) => {
  return (
    <Button variant="primaryLight" size="small" onPress={() => addItemToBag(product)}>
      Reserve
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

export const ReserveButton = connect(mapDispatchToProps)(ReserveButtonComponent)
