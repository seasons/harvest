import { Button } from "App/Components"
import { togglePopUp } from "App/Redux/actions"
import gql from "graphql-tag"
import { head } from "lodash"
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { useMutation, useQuery } from "@apollo/react-hooks"

interface Props {
  productState: any
  productID: string
  displayConfirmation: (type: string) => void
  addItemToBag: (product: any) => void
  removeItemFromWantItems: (product: any) => void
  addItemToWantItems: (product: any) => void
  togglePopUp: (show: boolean, data: any) => void
  disabled?: Boolean
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

export const ReserveButtonComponent: React.FC<Props> = props => {
  const { displayConfirmation, productID, productState, togglePopUp } = props
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
      displayConfirmation("reserve")
    },
    onError: err => {
      if (err && err.graphQLErrors) {
        const error = head(err.graphQLErrors)
        console.log(error)

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
  })

  const handleReserve = () => {
    addToBag()
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
      removeFromBag()
    }
    showCheckMark = true
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
      togglePopUp,
    },
    dispatch
  )

const mapStateToProps = state => {
  const { bag, productState } = state
  return { bag, productState }
}

export const ReserveButton = connect(mapStateToProps, mapDispatchToProps)(ReserveButtonComponent)
