import gql from "graphql-tag"

export const PRODUCT_VARIANT_CREATE_ORDER = gql`
  mutation ProductVariantCreateOrder(input: ProductVariantCreateOrderInput!) {
    productVariantCreateOrder(input: $input) {
      total
      lineItems
      shippingAddress {
        address1
        address2
        city
        state
        zipCode
      }
    }
  }
`

export const PRODUCT_VARIANT_CREATE_DRAFT_ORDER = gql`
  mutation ProductVariantCreateDraftOrder(input: ProductVariantCreateDraftOrderInput!) {
    productVariantCreateDraftOrder(input: $input) {
      total
      lineItems
      shippingAddress {
        address1
        address2
        city
        state
        zipCode
      }
    }
  }
`
