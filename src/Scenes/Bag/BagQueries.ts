import { BagItemFragment } from "./Components/BagItem"
import gql from "graphql-tag"

export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

export const GET_BAG = gql`
  query GetBagAndSavedItems {
    me {
      activeReservation {
        id
        shipped
        createdAt
      }
      bag {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
        position
        saved
        status
      }
      savedItems {
        id
        productVariant {
          id
          ...BagItemProductVariant
        }
        saved
      }
    }
  }
  ${BagItemFragment}
`

export const ADD_TO_BAG = gql`
  mutation AddToBag($id: ID!) {
    addToBag(item: $id) {
      id
    }
  }
`

export const REMOVE_FROM_BAG = gql`
  mutation RemoveFromBag($id: ID!) {
    removeFromBag(item: $id) {
      id
    }
  }
`

export const REMOVE_FROM_BAG_AND_SAVE_ITEM = gql`
  mutation RemoveFromBagAndSaveItem($id: ID!) {
    removeFromBag(item: $id) {
      id
    }
    saveProduct(item: $id, save: true) {
      id
    }
  }
`
