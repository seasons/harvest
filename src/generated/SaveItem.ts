/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveItem
// ====================================================

export interface SaveItem_saveProduct_productVariant {
  __typename: "ProductVariant";
  id: string;
  isSaved: boolean;
}

export interface SaveItem_saveProduct {
  __typename: "BagItem";
  id: string;
  productVariant: SaveItem_saveProduct_productVariant;
}

export interface SaveItem {
  saveProduct: SaveItem_saveProduct | null;
}

export interface SaveItemVariables {
  item: string;
  save: boolean;
}
