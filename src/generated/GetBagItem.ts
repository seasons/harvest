/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Size } from "./globalTypes";

// ====================================================
// GraphQL fragment: GetBagItem
// ====================================================

export interface GetBagItem_product_brand {
  __typename: "Brand";
  name: string;
}

export interface GetBagItem_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
}

export interface GetBagItem_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: Size | null;
  brand: GetBagItem_product_brand;
  images: any;
  variants: GetBagItem_product_variants[] | null;
}

export interface GetBagItem {
  __typename: "ProductVariant";
  product: GetBagItem_product;
}
