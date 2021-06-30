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

export interface GetBrowseProducts_brands {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface GetBrowseProducts_productsConnection_aggregate {
  __typename: "AggregateProduct";
  count: number;
}

export interface GetBrowseProducts_productsConnection_edges_node_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBrowseProducts_productsConnection_edges_node_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetBrowseProducts_productsConnection_edges_node_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBrowseProducts_productsConnection_edges_node_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
  displayLong: string | null;
  displayShort: string | null;
}

export interface GetBrowseProducts_productsConnection_edges_node {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  images: GetBrowseProducts_productsConnection_edges_node_images[];
  modelSize: GetBrowseProducts_productsConnection_edges_node_modelSize | null;
  modelHeight: number | null;
  externalURL: string | null;
  retailPrice: number | null;
  status: ProductStatus | null;
  type: ProductType | null;
  createdAt: any;
  updatedAt: any;
  brand: GetBrowseProducts_productsConnection_edges_node_brand;
  variants: GetBrowseProducts_productsConnection_edges_node_variants[] | null;
}

export interface GetBrowseProducts_productsConnection_edges {
  __typename: "ProductEdge";
  node: GetBrowseProducts_productsConnection_edges_node;
}

export interface GetBrowseProducts_productsConnection {
  __typename: "ProductConnection";
  aggregate: GetBrowseProducts_productsConnection_aggregate;
  edges: (GetBrowseProducts_productsConnection_edges | null)[];
}

export interface GetBrowseProducts {
  categories: (GetBrowseProducts_categories | null)[];
  brands: (GetBrowseProducts_brands | null)[];
  productsConnection: GetBrowseProducts_productsConnection;
}

export interface GetBrowseProductsVariables {
  categoryName: string;
  brandNames?: (string | null)[] | null;
  colors?: (string | null)[] | null;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
  tops?: (string | null)[] | null;
  bottoms?: (string | null)[] | null;
  available?: boolean | null;
  forSaleOnly?: boolean | null;
}
