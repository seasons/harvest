/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, Size, ProductStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrand
// ====================================================

export interface GetBrand_brand_products_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
}

export interface GetBrand_brand_products {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  images: any;
  modelSize: Size | null;
  modelHeight: number | null;
  externalURL: string | null;
  tags: any | null;
  retailPrice: number | null;
  status: ProductStatus | null;
  createdAt: any;
  updatedAt: any;
  variants: GetBrand_brand_products_variants[] | null;
}

export interface GetBrand_brand {
  __typename: "Brand";
  id: string;
  name: string;
  basedIn: string | null;
  description: string | null;
  products: GetBrand_brand_products[] | null;
}

export interface GetBrand {
  brand: GetBrand_brand | null;
}

export interface GetBrandVariables {
  brandID: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
