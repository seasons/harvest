/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollection
// ====================================================

export interface GetCollection_collection_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCollection_collection_products_modelSize {
  __typename: "Size";
  display: string;
}

export interface GetCollection_collection_products_brand {
  __typename: "Brand";
  name: string;
}

export interface GetCollection_collection_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCollection_collection_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  retailPrice: number | null;
  modelSize: GetCollection_collection_products_modelSize | null;
  modelHeight: number | null;
  brand: GetCollection_collection_products_brand;
  images: GetCollection_collection_products_images[];
}

export interface GetCollection_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  images: GetCollection_collection_images[] | null;
  title: string | null;
  subTitle: string | null;
  products: GetCollection_collection_products[] | null;
}

export interface GetCollection {
  collection: GetCollection_collection | null;
}

export interface GetCollectionVariables {
  collectionID: string;
}
