import React from "react"
import { Button } from "App/Components"
import { addItemToBag } from "App/Redux/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

interface Props {
  productID: string
  addItemToBag: (product: any) => void
}

export const ReserveButtonComponent: React.FC<Props> = ({ productID, addItemToBag }) => {
  return (
    <Button variant="primaryLight" size="small" onPress={() => addItemToBag(productID)}>
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

export const ReserveButton = connect(
  null,
  mapDispatchToProps
)(ReserveButtonComponent)
