/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLocalBag
// ====================================================

export interface GetLocalBag_localBagItems {
  __typename: "LocalProduct";
  productID: string;
  variantID: string;
}

export interface GetLocalBag {
  localBagItems: GetLocalBag_localBagItems[];
}
