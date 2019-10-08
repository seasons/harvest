import React from "react"
import { Button } from "App/Components"
import { useStateValue } from "App/helpers/StateProvider"

interface Props {
  product: any
}

export const ReserveButton: React.FC<Props> = ({ product }) => {
  const [_, dispatch] = useStateValue()
  return (
    <Button
      variant="primaryLight"
      size="small"
      onPress={() =>
        dispatch({
          type: "addItemToBag",
          item: product,
        })
      }
    >
      Reserve
    </Button>
  )
}
