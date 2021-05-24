import gql from "graphql-tag"

export const UPDATE_PRODUCT_RESERVATION_FEEDBACK = gql`
  mutation UpdateProductReservationFeedback(
    $reservationFeedbackID: ID!
    $productReservationID: ID!
    $input: ProductVariantFeedbackUpdateInput!
    $responses: JSON
  ) {
    updateProductReservationFeedback(
      reservationFeedbackID: $reservationFeedbackID
      productReservationID: $productReservationID
      input: $input
      responses: $responses
    ) {
      id
    }
  }
`
