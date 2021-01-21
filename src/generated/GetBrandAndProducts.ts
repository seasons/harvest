/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, ProductStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrandAndProducts
// ====================================================

export interface GetBrandAndProducts_brand_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBrandAndProducts_brand_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBrandAndProducts_brand_products_variants {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  displayLong: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
}

export interface GetBrandAndProducts_brand_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  images: GetBrandAndProducts_brand_products_images[];
  modelHeight: number | null;
  externalURL: string | null;
  retailPrice: number | null;
  status: ProductStatus | null;
  createdAt: any;
  updatedAt: any;
  variants: GetBrandAndProducts_brand_products_variants[] | null;
}

export interface GetBrandAndProducts_brand {
  __typename: "Brand";
  id: string;
  name: string;
  since: any | null;
  description: string | null;
  websiteUrl: string | null;
  basedIn: string | null;
  images: GetBrandAndProducts_brand_images[] | null;
  products: GetBrandAndProducts_brand_products[] | null;
}

export interface GetBrandAndProducts {
  brand: GetBrandAndProducts_brand | null;
}

export interface GetBrandAndProductsVariables {
  brandID: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
