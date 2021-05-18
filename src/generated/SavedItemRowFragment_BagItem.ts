/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SavedItemRowFragment_BagItem
// ====================================================

export interface SavedItemRowFragment_BagItem_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface SavedItemRowFragment_BagItem_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface SavedItemRowFragment_BagItem_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: SavedItemRowFragment_BagItem_productVariant_product_brand;
  images: SavedItemRowFragment_BagItem_productVariant_product_images[];
}

export interface SavedItemRowFragment_BagItem_productVariant {
  __typename: "ProductVariant";
  product: SavedItemRowFragment_BagItem_productVariant_product;
  id: string;
  reservable: number;
  displayLong: string | null;
  hasRestockNotification: boolean;
}

export interface SavedItemRowFragment_BagItem {
  __typename: "BagItem";
  id: string;
  productVariant: SavedItemRowFragment_BagItem_productVariant;
  saved: boolean | null;
}
