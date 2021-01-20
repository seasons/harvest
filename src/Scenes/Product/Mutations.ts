import gql from "graphql-tag"

export const PRODUCT_VARIANT_BUY_NEW_MUTATION = gql`
  mutation BuyNewProductVariant($variantID: ID!) {
    buyNewProductVariant(variantID: $variantID) {
      id
    }
  }
`

export const PRODUCT_VARIANT_BUY_USED_MUTATION = gql`
  mutation BuyUsedProductVariant($variantID: ID!) {
    buyUsedProductVariant(variantID: $variantID) {
      id
    }
  }
`
