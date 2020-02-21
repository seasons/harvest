/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromBagAndSaveItem
// ====================================================

export interface RemoveFromBagAndSaveItem_removeFromBag {
  __typename: "BagItem";
  id: string;
}

export interface RemoveFromBagAndSaveItem_saveProduct {
  __typename: "BagItem";
  id: string;
}

export interface RemoveFromBagAndSaveItem {
  removeFromBag: RemoveFromBagAndSaveItem_removeFromBag;
  saveProduct: RemoveFromBagAndSaveItem_saveProduct | null;
}

export interface RemoveFromBagAndSaveItemVariables {
  id: string;
}
