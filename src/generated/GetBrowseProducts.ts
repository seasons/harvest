/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, ProductStatus, ProductType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrowseProducts
// ====================================================

export interface GetBrowseProducts_categories_children {
  __typename: "Category";
  id: string;
  slug: string;
}

export interface GetBrowseProducts_categories {
  __typename: "Category";
  id: string;
  slug: string;
  name: string;
  children: GetBrowseProducts_categories_children[] | null;
}

export interface GetBrowseProducts_productsCount_aggregate {
  __typename: "AggregateProduct";
  count: number;
}

export interface GetBrowseProducts_productsCount {
  __typename: "ProductConnection";
  aggregate: GetBrowseProducts_productsCount_aggregate;
}

export interface GetBrowseProducts_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBrowseProducts_products_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBrowseProducts_products_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBrowseProducts_products_variants_display {
  __typename: "ProductVariantDisplay";
  short: string | null;
}

export interface GetBrowseProducts_products_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
  display: GetBrowseProducts_products_variants_display | null;
}

export interface GetBrowseProducts_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  images: GetBrowseProducts_products_images[];
  modelSize: GetBrowseProducts_products_modelSize | null;
  modelHeight: number | null;
  externalURL: string | null;
  retailPrice: number | null;
  status: ProductStatus | null;
  type: ProductType | null;
  createdAt: any;
  updatedAt: any;
  brand: GetBrowseProducts_products_brand;
  variants: GetBrowseProducts_products_variants[] | null;
}

export interface GetBrowseProducts {
  categories: (GetBrowseProducts_categories | null)[];
  productsCount: GetBrowseProducts_productsCount;
  products: (GetBrowseProducts_products | null)[];
}

export interface GetBrowseProductsVariables {
  name: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
  sizes?: string[] | null;
}
