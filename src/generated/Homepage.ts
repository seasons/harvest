/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HomePageSectionType, Rating, QuestionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: Homepage
// ====================================================

export interface Homepage_homepage_sections_results_Collection {
  __typename: "Collection";
}

export interface Homepage_homepage_sections_results_Brand {
  __typename: "Brand";
  id: string;
  name: string;
  since: any | null;
}

export interface Homepage_homepage_sections_results_Product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_homepage_sections_results_Product_variants_internalSize {
  __typename: "Size";
  display: string;
}

export interface Homepage_homepage_sections_results_Product_variants {
  __typename: "ProductVariant";
  id: string;
  internalSize: Homepage_homepage_sections_results_Product_variants_internalSize | null;
  reservable: number;
}

export interface Homepage_homepage_sections_results_Product {
  __typename: "Product";
  id: string;
  slug: string;
  images: any;
  brand: Homepage_homepage_sections_results_Product_brand;
  variants: Homepage_homepage_sections_results_Product_variants[] | null;
}

export type Homepage_homepage_sections_results = Homepage_homepage_sections_results_Collection | Homepage_homepage_sections_results_Brand | Homepage_homepage_sections_results_Product;

export interface Homepage_homepage_sections {
  __typename: "HomepageSection";
  title: string | null;
  type: HomePageSectionType;
  results: Homepage_homepage_sections_results[];
}

export interface Homepage_homepage {
  __typename: "Homepage";
  sections: Homepage_homepage_sections[];
}

export interface Homepage_reservationFeedback_feedbacks_questions {
  __typename: "ProductVariantFeedbackQuestion";
  id: string;
  options: string[];
  question: string;
  responses: string[];
  type: QuestionType;
}

export interface Homepage_reservationFeedback_feedbacks_variant_product {
  __typename: "Product";
  id: string;
  images: any;
  name: string;
  retailPrice: number | null;
}

export interface Homepage_reservationFeedback_feedbacks_variant {
  __typename: "ProductVariant";
  id: string;
  product: Homepage_reservationFeedback_feedbacks_variant_product;
}

export interface Homepage_reservationFeedback_feedbacks {
  __typename: "ProductVariantFeedback";
  id: string;
  isCompleted: boolean;
  questions: Homepage_reservationFeedback_feedbacks_questions[] | null;
  variant: Homepage_reservationFeedback_feedbacks_variant;
}

export interface Homepage_reservationFeedback {
  __typename: "ReservationFeedback";
  id: string;
  comment: string | null;
  rating: Rating | null;
  feedbacks: Homepage_reservationFeedback_feedbacks[] | null;
}

export interface Homepage {
  homepage: Homepage_homepage | null;
  reservationFeedback: Homepage_reservationFeedback | null;
}
