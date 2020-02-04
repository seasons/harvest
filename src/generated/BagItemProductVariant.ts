/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Size } from "./globalTypes";

// ====================================================
// GraphQL fragment: BagItemProductVariant
// ====================================================

export interface BagItemProductVariant_product_brand {
  __typename: "Brand";
  name: string;
}

export interface BagItemProductVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
}

export interface BagItemProductVariant_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: Size | null;
  brand: BagItemProductVariant_product_brand;
  images: any;
  variants: BagItemProductVariant_product_variants[] | null;
}

export interface BagItemProductVariant {
  __typename: "ProductVariant";
  product: BagItemProductVariant_product;
}
