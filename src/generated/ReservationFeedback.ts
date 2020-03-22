/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Rating, QuestionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReservationFeedback
// ====================================================

export interface ReservationFeedback_reservationFeedback_feedbacks_questions {
  __typename: "ProductVariantFeedbackQuestion";
  id: string;
  options: string[];
  question: string;
  responses: string[];
  type: QuestionType;
}

export interface ReservationFeedback_reservationFeedback_feedbacks_variant_product {
  __typename: "Product";
  images: any;
  name: string;
  retailPrice: number | null;
}

export interface ReservationFeedback_reservationFeedback_feedbacks_variant {
  __typename: "ProductVariant";
  id: string;
  product: ReservationFeedback_reservationFeedback_feedbacks_variant_product;
}

export interface ReservationFeedback_reservationFeedback_feedbacks {
  __typename: "ProductVariantFeedback";
  id: string;
  isCompleted: boolean;
  questions: ReservationFeedback_reservationFeedback_feedbacks_questions[] | null;
  variant: ReservationFeedback_reservationFeedback_feedbacks_variant;
}

export interface ReservationFeedback_reservationFeedback {
  __typename: "ReservationFeedback";
  id: string;
  comment: string | null;
  rating: Rating | null;
  feedbacks: ReservationFeedback_reservationFeedback_feedbacks[] | null;
}

export interface ReservationFeedback {
  reservationFeedback: ReservationFeedback_reservationFeedback | null;
}
