import gql from "graphql-tag"

import { BagSectionFragment_BagSection } from "./Components/BagSection/BagSection"
import { ReservationHistoryTabFragment_Customer } from "./Components/ReservationHistoryTab"
import { SavedItemsTabFragment_Me } from "./Components/SavedItemsTab"

export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

export const GET_LOCAL_BAG_ITEMS = gql`
  query GetLocalBagItems($ids: [ID!]) {
    productVariants(where: { id_in: $ids }) {
      id
    }
  }
`

export const SavedTab_Query = gql`
  query SavedTab_Query {
    me {
      id
      ...SavedItemsTabFragment_Me
    }
  }
  ${SavedItemsTabFragment_Me}
`

export const ReservationHistoryTab_Query = gql`
  query ReservationHistoryTab_Query {
    me {
      id
      customer {
        ...ReservationHistoryTabFragment_Customer
      }
    }
  }
  ${ReservationHistoryTabFragment_Customer}
`

export const GetBag_NoCache_Query = gql`
  query GetBag_NoCache_Query {
    me {
      id
      customer {
        id
        status
        shouldPayForNextReservation
        invoices {
          id
          subscriptionId
        }
        user {
          id
        }
        detail {
          id
          shippingAddress {
            id
            city
            state
            address1
            zipCode
          }
        }
        membership {
          id
          subscription {
            id
            nextBillingAt
            currentTermStart
          }
          plan {
            id
            tier
            price
            itemCount
            pauseWithItemsPrice
          }
          pauseRequests(orderBy: createdAt_DESC) {
            id
            pauseType
            resumeDate
            pauseDate
            pausePending
          }
        }
      }
      bagSections {
        ...BagSectionFragment_BagSection
      }
      bag {
        id
        position
        saved
        status
        productVariant {
          id
          purchased
        }
      }
    }
  }
  ${BagSectionFragment_BagSection}
`

export const ADD_TO_BAG = gql`
  mutation AddToBag($id: ID!) {
    addToBag(item: $id) {
      id
    }
  }
`

export const DELETE_BAG_ITEM = gql`
  mutation deleteBagItem($itemID: ID!) {
    deleteBagItem(itemID: $itemID)
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
