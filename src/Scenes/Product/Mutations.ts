import gql from "graphql-tag"

export const PRODUCT_VARIANT_CREATE_ORDER = gql`
  mutation ProductVariantCreateOrder($input: CreateProductVariantDraftOrderInput!) {
    createProductVariantOrder(input: $input) {
      total
      lineItems {
        amount
        description
      }
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
  mutation ProductVariantCreateDraftOrder($input: CreateProductVariantDraftOrderInput!) {
    createProductVariantDraftOrder(input: $input) {
      total
      lineItems {
        amount
        description
      }
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
