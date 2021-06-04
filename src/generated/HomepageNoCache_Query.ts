/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Rating, QuestionType, CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: HomepageNoCache_Query
// ====================================================

export interface HomepageNoCache_Query_reservationFeedback_feedbacks_questions {
  __typename: "ProductVariantFeedbackQuestion";
  id: string;
  options: string[];
  question: string;
  responses: string[];
  type: QuestionType;
}

export interface HomepageNoCache_Query_reservationFeedback_feedbacks_variant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface HomepageNoCache_Query_reservationFeedback_feedbacks_variant_product {
  __typename: "Product";
  id: string;
  name: string;
  retailPrice: number | null;
  images: HomepageNoCache_Query_reservationFeedback_feedbacks_variant_product_images[];
}

export interface HomepageNoCache_Query_reservationFeedback_feedbacks_variant {
  __typename: "ProductVariant";
  id: string;
  product: HomepageNoCache_Query_reservationFeedback_feedbacks_variant_product;
}

export interface HomepageNoCache_Query_reservationFeedback_feedbacks {
  __typename: "ProductVariantFeedback";
  id: string;
  isCompleted: boolean;
  questions: HomepageNoCache_Query_reservationFeedback_feedbacks_questions[] | null;
  variant: HomepageNoCache_Query_reservationFeedback_feedbacks_variant;
}

export interface HomepageNoCache_Query_reservationFeedback {
  __typename: "ReservationFeedback";
  id: string;
  comment: string | null;
  rating: Rating | null;
  feedbacks: HomepageNoCache_Query_reservationFeedback_feedbacks[] | null;
}

export interface HomepageNoCache_Query_me_customer_bagItems {
  __typename: "BagItem";
  id: string;
}

export interface HomepageNoCache_Query_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
}

export interface HomepageNoCache_Query_me_customer_user {
  __typename: "User";
  id: string;
  createdAt: any;
}

export interface HomepageNoCache_Query_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  state: string | null;
}

export interface HomepageNoCache_Query_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: HomepageNoCache_Query_me_customer_detail_shippingAddress | null;
}

export interface HomepageNoCache_Query_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  shouldRequestFeedback: boolean | null;
  bagItems: HomepageNoCache_Query_me_customer_bagItems[] | null;
  admissions: HomepageNoCache_Query_me_customer_admissions | null;
  user: HomepageNoCache_Query_me_customer_user;
  detail: HomepageNoCache_Query_me_customer_detail | null;
}

export interface HomepageNoCache_Query_me_savedItems_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface HomepageNoCache_Query_me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface HomepageNoCache_Query_me_savedItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface HomepageNoCache_Query_me_savedItems_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
}

export interface HomepageNoCache_Query_me_savedItems_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: HomepageNoCache_Query_me_savedItems_productVariant_product_modelSize | null;
  brand: HomepageNoCache_Query_me_savedItems_productVariant_product_brand;
  images: HomepageNoCache_Query_me_savedItems_productVariant_product_images[];
  variants: HomepageNoCache_Query_me_savedItems_productVariant_product_variants[] | null;
}

export interface HomepageNoCache_Query_me_savedItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: HomepageNoCache_Query_me_savedItems_productVariant_product;
}

export interface HomepageNoCache_Query_me_savedItems {
  __typename: "BagItem";
  id: string;
  productVariant: HomepageNoCache_Query_me_savedItems_productVariant;
}

export interface HomepageNoCache_Query_me {
  __typename: "Me";
  id: string | null;
  customer: HomepageNoCache_Query_me_customer | null;
  savedItems: HomepageNoCache_Query_me_savedItems[] | null;
}

export interface HomepageNoCache_Query {
  reservationFeedback: HomepageNoCache_Query_reservationFeedback | null;
  me: HomepageNoCache_Query_me | null;
}
