import gql from "graphql-tag"
import { BagItemFragment } from "./Components/BagItem"

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
      customer {
        id
        status
        invoices {
          id
          subscriptionId
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
          plan {
            id
            tier
            price
            itemCount
          }
          pauseRequests(orderBy: createdAt_DESC) {
            id
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
              internalSize {
                id
                display
              }
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
        returnedPackage {
          id
          shippingLabel {
            trackingURL
          }
        }
        sentPackage {
          id
          shippingLabel {
            trackingURL
          }
        }
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

export const ADD_OR_REMOVE_FROM_LOCAL_BAG = gql`
  mutation AddOrRemoveFromLocalBag($productID: ID!, $variantID: ID!) {
    addOrRemoveFromLocalBag(productID: $productID, variantID: $variantID) @client {
      productID
<<<<<<< HEAD
      variantID
=======
>>>>>>> Fetch referral link from backend
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
