/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCollection
// ====================================================

export interface GetCollection_collection_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCollection_collection_productsAggregate_aggregate {
  __typename: "AggregateProduct";
  count: number;
}

export interface GetCollection_collection_productsAggregate {
  __typename: "ProductConnection";
  aggregate: GetCollection_collection_productsAggregate_aggregate;
}

export interface GetCollection_collection_products_edges_node_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCollection_collection_products_edges_node_variants {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  reservable: number;
}

export interface GetCollection_collection_products_edges_node_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetCollection_collection_products_edges_node {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: GetCollection_collection_products_edges_node_images[];
  variants: GetCollection_collection_products_edges_node_variants[] | null;
  brand: GetCollection_collection_products_edges_node_brand;
}

export interface GetCollection_collection_products_edges {
  __typename: "ProductEdge";
  node: GetCollection_collection_products_edges_node;
}

export interface GetCollection_collection_products {
  __typename: "ProductConnection";
  edges: (GetCollection_collection_products_edges | null)[];
}

export interface GetCollection_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  title: string | null;
  subTitle: string | null;
  descriptions: string[];
  images: GetCollection_collection_images[] | null;
  productsAggregate: GetCollection_collection_productsAggregate;
  products: GetCollection_collection_products;
}

export interface GetCollection {
  collection: GetCollection_collection | null;
}

export interface GetCollectionVariables {
  slug: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
