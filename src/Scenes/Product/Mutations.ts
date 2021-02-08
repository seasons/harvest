import gql from "graphql-tag"

const OrderFragment = gql`
  fragment OrderFragment on Order {
    id
    orderNumber
    subTotal
    total
    type
    status
    createdAt
    updatedAt
    salesTaxTotal
    lineItems {
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
`

export const PRODUCT_VARIANT_CREATE_DRAFT_ORDER = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      ...OrderFragment
    }
  }
  ${OrderFragment}
`

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($input: SubmitOrderInput!) {
    submitOrder(input: $input) {
      id
      ...OrderFragment
    }
  }
  ${OrderFragment}
`
