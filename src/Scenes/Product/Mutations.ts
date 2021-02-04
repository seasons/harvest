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
      createdAt
      updatedAt
      items {
        id
        recordID
        recordType
        needShipping
        taxRate
        taxName
        taxPercentage
        taxPrice
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
