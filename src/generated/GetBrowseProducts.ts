/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, Size, ProductStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrowseProducts
// ====================================================

export interface GetBrowseProducts_categories_children {
  __typename: "Category";
  slug: string;
}

export interface GetBrowseProducts_categories {
  __typename: "Category";
  id: string;
  slug: string;
  name: string;
  children: GetBrowseProducts_categories_children[] | null;
}

export interface GetBrowseProducts_products_brand {
  __typename: "Brand";
  name: string;
}

export interface GetBrowseProducts_products_variants {
  __typename: "ProductVariant";
  id: string;
  size: Size;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
}

export interface GetBrowseProducts_products {
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
  brand: GetBrowseProducts_products_brand;
  variants: GetBrowseProducts_products_variants[] | null;
}

export interface GetBrowseProducts {
  categories: (GetBrowseProducts_categories | null)[];
  products: (GetBrowseProducts_products | null)[];
}

export interface GetBrowseProductsVariables {
  name: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
  sizes?: Size[] | null;
}
