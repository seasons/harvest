/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SavedItemFragment_BagItem
// ====================================================

export interface SavedItemFragment_BagItem_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface SavedItemFragment_BagItem_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface SavedItemFragment_BagItem_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: SavedItemFragment_BagItem_productVariant_product_brand;
  images: SavedItemFragment_BagItem_productVariant_product_images[];
}

export interface SavedItemFragment_BagItem_productVariant {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayLong: string | null;
  hasRestockNotification: boolean;
  product: SavedItemFragment_BagItem_productVariant_product;
}

export interface SavedItemFragment_BagItem {
  __typename: "BagItem";
  id: string;
  saved: boolean | null;
  productVariant: SavedItemFragment_BagItem_productVariant;
}
