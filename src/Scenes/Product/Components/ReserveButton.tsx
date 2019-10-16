import React from "react"
import { Button } from "App/Components"
import { useStateValue } from "App/helpers/StateProvider"

interface Props {
  product: any
  displayReserveConfirmation: () => void
}

export const ReserveButton: React.FC<Props> = ({ product, displayReserveConfirmation }) => {
  const [_, dispatch] = useStateValue() as any
  return (
    <Button
      variant="primaryLight"
      size="small"
      onPress={() => {
        displayReserveConfirmation()
        dispatch({
          type: "addItemToBag",
          item: product,
        })
      }}
    >
      Reserve
    </Button>
  )
}
