/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Size } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCollection
// ====================================================

export interface GetCollection_collection_products_brand {
  __typename: "Brand";
  name: string;
}

export interface GetCollection_collection_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  retailPrice: number | null;
  modelSize: Size | null;
  modelHeight: number | null;
  brand: GetCollection_collection_products_brand;
  images: any;
}

export interface GetCollection_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  descriptionTop: string | null;
  descriptionBottom: string | null;
  images: any;
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
