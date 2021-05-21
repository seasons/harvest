import gql from "graphql-tag"

export const UPDATE_PRODUCT_RESERVATION_FEEDBACK = gql`
  mutation UpdateProductReservationFeedback(
    $productReservationID: ID!
    $input: ProductVariantFeedbackUpdateInput!
    $responses: JSON
  ) {
    updateProductReservationFeedback(
      productReservationID: $productReservationID
      input: $input
      responses: $responses
    ) {
      id
    }
  }
`
