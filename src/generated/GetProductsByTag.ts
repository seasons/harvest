/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductsByTag
// ====================================================

export interface GetProductsByTag_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetProductsByTag_products_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
  displayShort: string | null;
}

export interface GetProductsByTag_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: GetProductsByTag_products_images[];
  variants: GetProductsByTag_products_variants[] | null;
}

export interface GetProductsByTag {
  products: (GetProductsByTag_products | null)[];
}

export interface GetProductsByTagVariables {
  tag: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
