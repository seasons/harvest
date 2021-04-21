import gql from "graphql-tag"
import { BagItemFragment } from "./Components/BagItem"
import { DeliveryStatusFragment_Query } from "./Components/DeliveryStatus"

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
        reservations(orderBy: createdAt_DESC) {
          id
          status
          reservationNumber
          createdAt
          products {
            id
            productVariant {
              id
              displayShort
              product {
                id
                slug
                name
                images(size: Thumb) {
                  id
                  url
                }
                brand {
                  id
                  name
                }
              }
            }
          }
        }
      }
      activeReservation {
        id
        returnAt
        shipped
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
      savedItems {
        id
        saved
        productVariant {
          id
          ...BagItemProductVariant
        }
      }
    }
    ...DeliveryStatusFragment_Query
  }
  ${DeliveryStatusFragment_Query}
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
