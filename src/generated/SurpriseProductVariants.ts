/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BagItemStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: SurpriseProductVariants
// ====================================================

export interface SurpriseProductVariants_surpriseProductVariants_product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface SurpriseProductVariants_surpriseProductVariants_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface SurpriseProductVariants_surpriseProductVariants_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: SurpriseProductVariants_surpriseProductVariants_product_brand;
  images: SurpriseProductVariants_surpriseProductVariants_product_images[];
}

export interface SurpriseProductVariants_surpriseProductVariants {
  __typename: "ProductVariant";
  id: string;
  isSaved: boolean;
  product: SurpriseProductVariants_surpriseProductVariants_product;
}

export interface SurpriseProductVariants_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
}

export interface SurpriseProductVariants_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: SurpriseProductVariants_me_bag_productVariant_product;
}

export interface SurpriseProductVariants_me_bag {
  __typename: "BagItem";
  id: string;
  productVariant: SurpriseProductVariants_me_bag_productVariant;
  position: number | null;
  saved: boolean | null;
  status: BagItemStatus;
}

export interface SurpriseProductVariants_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  itemCount: number | null;
}

export interface SurpriseProductVariants_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: SurpriseProductVariants_me_customer_membership_plan | null;
}

export interface SurpriseProductVariants_me_customer {
  __typename: "Customer";
  id: string;
  membership: SurpriseProductVariants_me_customer_membership | null;
}

export interface SurpriseProductVariants_me {
  __typename: "Me";
  bag: SurpriseProductVariants_me_bag[] | null;
  customer: SurpriseProductVariants_me_customer | null;
}

export interface SurpriseProductVariants {
  surpriseProductVariants: (SurpriseProductVariants_surpriseProductVariants | null)[];
  me: SurpriseProductVariants_me | null;
}
