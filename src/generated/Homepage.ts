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
  id: string;
  display: string;
}

export interface Homepage_homepage_sections_results_Product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  internalSize: Homepage_homepage_sections_results_Product_variants_internalSize | null;
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
  name: string;
  retailPrice: number | null;
  images: Homepage_reservationFeedback_feedbacks_variant_product_images[];
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
  id: string;
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
  id: string;
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
  category: string | null;
  imageURL: string | null;
}

export interface Homepage_archivalProducts_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_archivalProducts {
  __typename: "Product";
  id: string;
  slug: string;
  images: Homepage_archivalProducts_images[];
}

export interface Homepage_justAddedTops_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_justAddedTops_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_justAddedTops_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Homepage_justAddedTops_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  internalSize: Homepage_justAddedTops_variants_internalSize | null;
}

export interface Homepage_justAddedTops {
  __typename: "Product";
  id: string;
  slug: string;
  images: Homepage_justAddedTops_images[];
  brand: Homepage_justAddedTops_brand;
  variants: Homepage_justAddedTops_variants[] | null;
}

export interface Homepage_justAddedBottoms_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_justAddedBottoms_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_justAddedBottoms_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Homepage_justAddedBottoms_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  internalSize: Homepage_justAddedBottoms_variants_internalSize | null;
}

export interface Homepage_justAddedBottoms {
  __typename: "Product";
  id: string;
  slug: string;
  images: Homepage_justAddedBottoms_images[];
  brand: Homepage_justAddedBottoms_brand;
  variants: Homepage_justAddedBottoms_variants[] | null;
}

export interface Homepage_communityStyle_user {
  __typename: "User";
  firstName: string;
  lastName: string;
}

export interface Homepage_communityStyle_location {
  __typename: "Location";
  city: string | null;
  state: string | null;
}

export interface Homepage_communityStyle_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Homepage_communityStyle {
  __typename: "StyleSubmission";
  id: string;
  user: Homepage_communityStyle_user;
  location: Homepage_communityStyle_location | null;
  image: Homepage_communityStyle_image;
  createdAt: any;
}

export interface Homepage {
  homepage: Homepage_homepage | null;
  reservationFeedback: Homepage_reservationFeedback | null;
  me: Homepage_me | null;
  blogPosts: Homepage_blogPosts[];
  archivalProducts: (Homepage_archivalProducts | null)[];
  justAddedTops: (Homepage_justAddedTops | null)[];
  justAddedBottoms: (Homepage_justAddedBottoms | null)[];
  communityStyle: Homepage_communityStyle[];
}
