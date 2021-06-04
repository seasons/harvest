/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SavedTab_Query
// ====================================================

export interface SavedTab_Query_me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface SavedTab_Query_me_savedItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface SavedTab_Query_me_savedItems_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: SavedTab_Query_me_savedItems_productVariant_product_brand;
  images: SavedTab_Query_me_savedItems_productVariant_product_images[];
}

export interface SavedTab_Query_me_savedItems_productVariant {
  __typename: "ProductVariant";
  product: SavedTab_Query_me_savedItems_productVariant_product;
  id: string;
  reservable: number;
  displayLong: string | null;
  hasRestockNotification: boolean;
}

export interface SavedTab_Query_me_savedItems {
  __typename: "BagItem";
  id: string;
  productVariant: SavedTab_Query_me_savedItems_productVariant;
  saved: boolean | null;
}

export interface SavedTab_Query_me {
  __typename: "Me";
  id: string | null;
  savedItems: SavedTab_Query_me_savedItems[] | null;
}

export interface SavedTab_Query {
  me: SavedTab_Query_me | null;
}
