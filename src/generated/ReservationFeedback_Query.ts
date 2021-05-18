/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Rating, QuestionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReservationFeedback_Query
// ====================================================

export interface ReservationFeedback_Query_reservationFeedback_feedbacks_questions {
  __typename: "ProductVariantFeedbackQuestion";
  id: string;
  options: string[];
  question: string;
  responses: string[];
  type: QuestionType;
}

export interface ReservationFeedback_Query_reservationFeedback_feedbacks_variant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface ReservationFeedback_Query_reservationFeedback_feedbacks_variant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ReservationFeedback_Query_reservationFeedback_feedbacks_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  retailPrice: number | null;
  brand: ReservationFeedback_Query_reservationFeedback_feedbacks_variant_product_brand;
  images: ReservationFeedback_Query_reservationFeedback_feedbacks_variant_product_images[];
}

export interface ReservationFeedback_Query_reservationFeedback_feedbacks_variant {
  __typename: "ProductVariant";
  id: string;
  product: ReservationFeedback_Query_reservationFeedback_feedbacks_variant_product;
}

export interface ReservationFeedback_Query_reservationFeedback_feedbacks {
  __typename: "ProductVariantFeedback";
  id: string;
  isCompleted: boolean;
  questions: ReservationFeedback_Query_reservationFeedback_feedbacks_questions[] | null;
  variant: ReservationFeedback_Query_reservationFeedback_feedbacks_variant;
}

export interface ReservationFeedback_Query_reservationFeedback {
  __typename: "ReservationFeedback";
  id: string;
  comment: string | null;
  rating: Rating | null;
  feedbacks: ReservationFeedback_Query_reservationFeedback_feedbacks[] | null;
}

export interface ReservationFeedback_Query {
  reservationFeedback: ReservationFeedback_Query_reservationFeedback | null;
}
