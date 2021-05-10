import gql from "graphql-tag"
import { OrderFragment_Order } from "@seasons/eclipse"

export const PRODUCT_VARIANT_CREATE_DRAFT_ORDER = gql`
  mutation ProductVariantCreateDraftOrder($input: CreateDraftedOrderInput!) {
    createDraftedOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
`

export const SUBMIT_ORDER = gql`
  mutation SubmitOrder($input: SubmitOrderInput!) {
    submitOrder(input: $input) {
      id
      ...OrderFragment_Order
    }
  }
  ${OrderFragment_Order}
`
