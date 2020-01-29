/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Size } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_product_brand {
  __typename: "Brand";
  name: string;
}

export interface GetProduct_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
}

export interface GetProduct_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: Size | null;
  brand: GetProduct_product_brand;
  images: any;
  variants: GetProduct_product_variants[] | null;
}

export interface GetProduct {
  product: GetProduct_product | null;
}

export interface GetProductVariables {
  productId: string;
  variantId: string;
}
