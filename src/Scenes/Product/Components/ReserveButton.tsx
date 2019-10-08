import React from "react"
import { Button } from "App/Components"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

interface Props {
  product: any
}

const ADD_ITEM_TO_BAG = gql`
  mutation AddItemToBag($item: Obj!) {
    addItemToBag(item: $item) @client
  }
`

export const ReserveButton: React.FC<Props> = ({ product }) => {
  const [addItemToBag] = useMutation(ADD_ITEM_TO_BAG, { variables: { item: product } })
  return (
    <Button variant="primaryLight" size="small" onPress={addItemToBag}>
      Reserve
    </Button>
  )
}
