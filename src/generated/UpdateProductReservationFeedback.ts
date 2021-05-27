/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVariantFeedbackUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProductReservationFeedback
// ====================================================

export interface UpdateProductReservationFeedback_updateProductReservationFeedback {
  __typename: "ProductVariantFeedback";
  id: string;
}

export interface UpdateProductReservationFeedback {
  updateProductReservationFeedback: UpdateProductReservationFeedback_updateProductReservationFeedback;
}

export interface UpdateProductReservationFeedbackVariables {
  reservationFeedbackID: string;
  productReservationID: string;
  input: ProductVariantFeedbackUpdateInput;
  responses?: any | null;
}
