/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Size, BagItemStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBagAndSavedItems
// ====================================================

export interface GetBagAndSavedItems_me_activeReservation {
  __typename: "Reservation";
  id: string;
  shipped: boolean;
  createdAt: any;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
}

export interface GetBagAndSavedItems_me_bag_productVariant_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: Size | null;
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

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
}

export interface GetBagAndSavedItems_me_savedItems_productVariant_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: Size | null;
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
  activeReservation: GetBagAndSavedItems_me_activeReservation | null;
  bag: GetBagAndSavedItems_me_bag[];
  savedItems: GetBagAndSavedItems_me_savedItems[];
}

export interface GetBagAndSavedItems {
  me: GetBagAndSavedItems_me | null;
}
