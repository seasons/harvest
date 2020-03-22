/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReservationFeedbackUpdateInput, Rating, QuestionType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReservationFeedback
// ====================================================

export interface UpdateReservationFeedback_updateReservationFeedback_feedbacks_questions {
  __typename: "ProductVariantFeedbackQuestion";
  id: string;
  options: string[];
  question: string;
  responses: string[];
  type: QuestionType;
}

export interface UpdateReservationFeedback_updateReservationFeedback_feedbacks_variant_product {
  __typename: "Product";
  images: any;
  name: string;
  retailPrice: number | null;
}

export interface UpdateReservationFeedback_updateReservationFeedback_feedbacks_variant {
  __typename: "ProductVariant";
  id: string;
  product: UpdateReservationFeedback_updateReservationFeedback_feedbacks_variant_product;
}

export interface UpdateReservationFeedback_updateReservationFeedback_feedbacks {
  __typename: "ProductVariantFeedback";
  id: string;
  isCompleted: boolean;
  questions: UpdateReservationFeedback_updateReservationFeedback_feedbacks_questions[] | null;
  variant: UpdateReservationFeedback_updateReservationFeedback_feedbacks_variant;
}

export interface UpdateReservationFeedback_updateReservationFeedback {
  __typename: "ReservationFeedback";
  id: string;
  comment: string | null;
  rating: Rating | null;
  feedbacks: UpdateReservationFeedback_updateReservationFeedback_feedbacks[] | null;
}

export interface UpdateReservationFeedback {
  updateReservationFeedback: UpdateReservationFeedback_updateReservationFeedback;
}

export interface UpdateReservationFeedbackVariables {
  id: string;
  input: ReservationFeedbackUpdateInput;
}
