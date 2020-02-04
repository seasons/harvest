/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Size } from "./globalTypes";

// ====================================================
// GraphQL fragment: BagItemFragment
// ====================================================

export interface BagItemFragment_product_brand {
  __typename: "Brand";
  name: string;
}

export interface BagItemFragment_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
}

export interface BagItemFragment_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: Size | null;
  brand: BagItemFragment_product_brand;
  images: any;
  variants: BagItemFragment_product_variants[] | null;
}

export interface BagItemFragment {
  __typename: "ProductVariant";
  product: BagItemFragment_product;
}
