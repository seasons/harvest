import gql from "graphql-tag"

import { BagItemFragment } from "./Components/BagItem"
import { BagTabHeaderFragment_Query } from "./Components/BagTabHeader"
import { DeliveryStatusFragment_Me } from "./Components/DeliveryStatus"
import { ReservationHistoryTabFragment_Customer } from "./Components/ReservationHistoryTab"
import { SavedItemsTabFragment_Me } from "./Components/SavedItemsTab"

export const CHECK_ITEMS = gql`
  mutation CheckItemsAvailability($items: [ID!]!) {
    checkItemsAvailability(items: $items)
  }
`

export const GET_LOCAL_BAG = gql`
  query GetLocalBag {
    localBagItems @client {
      productID
      variantID
    }
  }
`

export const GET_LOCAL_BAG_ITEMS = gql`
  query GetLocalBagItems($ids: [ID!]) {
    products(where: { id_in: $ids }) {
      id

      variants {
        id
        ...BagItemProductVariant
      }
    }
  }
  ${BagItemFragment}
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

export const GET_BAG = gql`
  query GetBagAndSavedItems {
    paymentPlans(where: { status: "active" }) {
      id
      planID
      tier
      price
      itemCount
    }
    me {
      id
      customer {
        id
        status
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
      activeReservation {
        id
        returnAt
        shipped
        returnedAt
        createdAt
        status
        phase
        updatedAt
      }
      bag {
        id
        position
        saved
        status
        productVariant {
          id
          purchased
          ...BagItemProductVariant
        }
      }
      ...DeliveryStatusFragment_Me
    }
    ...BagTabHeaderFragment_Query
  }
  ${BagTabHeaderFragment_Query}
  ${DeliveryStatusFragment_Me}
  ${BagItemFragment}
`

export const ADD_OR_REMOVE_FROM_LOCAL_BAG = gql`
  mutation AddOrRemoveFromLocalBag($productID: ID!, $variantID: ID!) {
    addOrRemoveFromLocalBag(productID: $productID, variantID: $variantID) @client {
      productID
      variantID
    }
  }
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
