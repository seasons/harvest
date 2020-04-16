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
      customer {
        id
        plan
        reservations(orderBy: createdAt_DESC) {
          id
          status
          reservationNumber
          createdAt
          products {
            id
            productVariant {
              id
              internalSize {
                display
              }
              product {
                images
                name
                brand {
                  name
                }
              }
            }
          }
        }
      }
      activeReservation {
        id
        returnDateDisplay
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
  mutation RemoveFromBag($id: ID!, $saved: Boolean!) {
    removeFromBag(item: $id, saved: $saved) {
      id
    }
  }
`

export const REMOVE_FROM_BAG_AND_SAVE_ITEM = gql`
  mutation RemoveFromBagAndSaveItem($id: ID!, $saved: Boolean!) {
    removeFromBag(item: $id, saved: $saved) {
      id
    }
    saveProduct(item: $id, save: true) {
      id
    }
  }
`
