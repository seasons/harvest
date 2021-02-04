/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ResetLocalCache
// ====================================================

export interface ResetLocalCache_localBagItems {
  __typename: "LocalProduct";
  productID: string;
  variantID: string;
}

export interface ResetLocalCache {
  localBagItems: ResetLocalCache_localBagItems[];
}
