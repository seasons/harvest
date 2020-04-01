/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

<<<<<<< HEAD
import { ProductOrderByInput, ProductStatus } from "./globalTypes";
=======
import { ProductOrderByInput, ProductStatus } from "./globalTypes"
>>>>>>> nest

// ====================================================
// GraphQL query operation: GetBrowseProducts
// ====================================================

export interface GetBrowseProducts_categories_children {
  __typename: "Category"
  slug: string
}

export interface GetBrowseProducts_categories {
  __typename: "Category"
  id: string
  slug: string
  name: string
  children: GetBrowseProducts_categories_children[] | null
}

export interface GetBrowseProducts_products_modelSize {
  __typename: "Size"
  display: string
}

export interface GetBrowseProducts_products_modelSize {
  __typename: "Size";
  display: string;
}

export interface GetBrowseProducts_products_brand {
  __typename: "Brand"
  id: string
  name: string
}

export interface GetBrowseProducts_products_variants_internalSize {
  __typename: "Size"
  display: string
}

export interface GetBrowseProducts_products_variants {
<<<<<<< HEAD
  __typename: "ProductVariant";
  id: string;
  size: string | null;
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
  modelSize: GetBrowseProducts_products_modelSize | null;
  modelHeight: number | null;
  externalURL: string | null;
  tags: any | null;
  retailPrice: number | null;
  status: ProductStatus | null;
  createdAt: any;
  updatedAt: any;
  brand: GetBrowseProducts_products_brand;
  variants: GetBrowseProducts_products_variants[] | null;
=======
  __typename: "ProductVariant"
  id: string
  size: string | null
  total: number
  reservable: number
  nonReservable: number
  reserved: number
  isSaved: boolean
  internalSize: GetBrowseProducts_products_variants_internalSize | null
}

export interface GetBrowseProducts_products {
  __typename: "Product"
  id: string
  name: string
  description: string | null
  images: any
  modelSize: GetBrowseProducts_products_modelSize | null
  modelHeight: number | null
  externalURL: string | null
  tags: any | null
  retailPrice: number | null
  status: ProductStatus | null
  createdAt: any
  updatedAt: any
  brand: GetBrowseProducts_products_brand
  variants: GetBrowseProducts_products_variants[] | null
>>>>>>> nest
}

export interface GetBrowseProducts {
  categories: (GetBrowseProducts_categories | null)[]
  products: (GetBrowseProducts_products | null)[]
}

export interface GetBrowseProductsVariables {
<<<<<<< HEAD
  name: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
  sizes?: string[] | null;
=======
  name: string
  first: number
  skip: number
  orderBy: ProductOrderByInput
  sizes?: string[] | null
>>>>>>> nest
}
