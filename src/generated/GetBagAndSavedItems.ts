/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan, BagItemStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBagAndSavedItems
// ====================================================

export interface GetBagAndSavedItems_me_customer {
  __typename: "Customer";
  id: string;
  plan: Plan | null;
}

export interface GetBagAndSavedItems_me_activeReservation {
  __typename: "Reservation";
  id: string;
  returnDateDisplay: any | null;
  shipped: boolean;
  createdAt: any;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_modelSize {
  __typename: "Size";
  display: string;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_variants_internalSize {
  __typename: "Size";
  display: string;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  internalSize: GetBagAndSavedItems_me_bag_productVariant_product_variants_internalSize | null;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: GetBagAndSavedItems_me_bag_productVariant_product_modelSize | null;
  brand: GetBagAndSavedItems_me_bag_productVariant_product_brand;
  images: any;
  variants: GetBagAndSavedItems_me_bag_productVariant_product_variants[] | null;
}

export interface GetBagAndSavedItems_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetBagAndSavedItems_me_bag_productVariant_product;
}

export interface GetBagAndSavedItems_me_bag {
  __typename: "BagItem";
  id: string;
  productVariant: GetBagAndSavedItems_me_bag_productVariant;
  position: number | null;
  saved: boolean | null;
  status: BagItemStatus;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_modelSize {
  __typename: "Size";
  display: string;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_variants_internalSize {
  __typename: "Size";
  display: string;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  internalSize: GetBagAndSavedItems_me_savedItems_productVariant_product_variants_internalSize | null;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: GetBagAndSavedItems_me_savedItems_productVariant_product_modelSize | null;
  brand: GetBagAndSavedItems_me_savedItems_productVariant_product_brand;
  images: any;
  variants: GetBagAndSavedItems_me_savedItems_productVariant_product_variants[] | null;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetBagAndSavedItems_me_savedItems_productVariant_product;
}

export interface GetBagAndSavedItems_me_savedItems {
  __typename: "BagItem";
  id: string;
  productVariant: GetBagAndSavedItems_me_savedItems_productVariant;
  saved: boolean | null;
}

export interface GetBagAndSavedItems_me {
  __typename: "Me";
  customer: GetBagAndSavedItems_me_customer;
  activeReservation: GetBagAndSavedItems_me_activeReservation | null;
  bag: GetBagAndSavedItems_me_bag[];
  savedItems: GetBagAndSavedItems_me_savedItems[];
}

export interface GetBagAndSavedItems {
  me: GetBagAndSavedItems_me | null;
}
