/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductVariant
// ====================================================

export interface GetProductVariant_productVariant {
  __typename: "ProductVariant";
  id: string;
  isWanted: boolean;
}

export interface GetProductVariant {
  productVariant: GetProductVariant_productVariant;
}

export interface GetProductVariantVariables {
  variantID: string;
}
