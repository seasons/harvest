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

export interface Homepage_homepage_sections_results_Product_images {
  __typename: "Image";
  id: string;
  url: string | null;
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
  images: Homepage_homepage_sections_results_Product_images[];
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

export interface Homepage_reservationFeedback_feedbacks_variant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_reservationFeedback_feedbacks_variant_product {
  __typename: "Product";
  id: string;
  images: Homepage_reservationFeedback_feedbacks_variant_product_images[];
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

export interface Homepage_me_customer {
  __typename: "Customer";
  id: string;
  shouldRequestFeedback: boolean | null;
}

export interface Homepage_me_savedItems_productVariant_product_modelSize {
  __typename: "Size";
  display: string;
}

export interface Homepage_me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_me_savedItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_me_savedItems_productVariant_product_variants_internalSize {
  __typename: "Size";
  display: string;
}

export interface Homepage_me_savedItems_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  internalSize: Homepage_me_savedItems_productVariant_product_variants_internalSize | null;
}

export interface Homepage_me_savedItems_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: Homepage_me_savedItems_productVariant_product_modelSize | null;
  brand: Homepage_me_savedItems_productVariant_product_brand;
  images: Homepage_me_savedItems_productVariant_product_images[];
  variants: Homepage_me_savedItems_productVariant_product_variants[] | null;
}

export interface Homepage_me_savedItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: Homepage_me_savedItems_productVariant_product;
}

export interface Homepage_me_savedItems {
  __typename: "BagItem";
  id: string;
  productVariant: Homepage_me_savedItems_productVariant;
}

export interface Homepage_me {
  __typename: "Me";
  customer: Homepage_me_customer | null;
  savedItems: Homepage_me_savedItems[] | null;
}

export interface Homepage_blogPosts {
  __typename: "BlogPost";
  id: string;
  url: string | null;
  name: string | null;
  imageURL: string | null;
}

export interface Homepage_archivalProducts_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_archivalProducts_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_archivalProducts {
  __typename: "Product";
  id: string;
  slug: string;
  images: Homepage_archivalProducts_images[];
  brand: Homepage_archivalProducts_brand;
}

export interface Homepage {
  homepage: Homepage_homepage | null;
  reservationFeedback: Homepage_reservationFeedback | null;
  me: Homepage_me | null;
  blogPosts: Homepage_blogPosts[];
  archivalProducts: (Homepage_archivalProducts | null)[];
}
