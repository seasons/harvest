import gql from "graphql-tag"

export const PRODUCT_VARIANT_CREATE_DRAFT_ORDER = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      orderNumber
      subTotal
      total
      type
      status
      salesTaxTotal
      createdAt
      updatedAt
      items {
        id
        recordID
        recordType
        needShipping
        price
        taxRate
        taxName
        taxPercentage
        taxPrice
        productVariant {
          id
          displayLong
          product {
            id
            slug
            name
            brand {
              id
              name
            }
            images(size: Thumb) {
              id
              url
            }
          }
        }
      }
    }
  }
`

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($input: SubmitOrderInput!) {
    submitOrder(input: $input) {
      id
      orderNumber
      subTotal
      total
      type
      status
      createdAt
      updatedAt
      salesTaxTotal
      # customer {
      #   id
      #   detail {
      #     id
      #     phoneNumber
      #     shippingAddress {
      #       id
      #       address1
      #       address2
      #       city
      #       state
      #       zipCode
      #       shippingOptions {
      #         id
      #         externalCost
      #         averageDuration
      #         shippingMethod {
      #           id
      #           code
      #           displayText
      #         }
      #       }
      #     }
      #   }
      # }
      items {
        id
        recordID
        recordType
        needShipping
        taxRate
        taxName
        taxPercentage
        taxPrice
        productVariant {
          id
          displayLong
          product {
            id
            slug
            name
            brand {
              id
              name
            }
            images(size: Thumb) {
              id
              url
            }
          }
        }
      }
    }
  }
`
