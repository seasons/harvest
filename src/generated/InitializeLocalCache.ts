/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InitializeLocalCache
// ====================================================

export interface InitializeLocalCache_localBagItems {
  __typename: "LocalProduct";
  productID: string;
  variantID: string;
}

export interface InitializeLocalCache {
  localBagItems: InitializeLocalCache_localBagItems[];
}
