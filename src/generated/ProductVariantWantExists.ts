/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductVariantWantExists
// ====================================================

export interface ProductVariantWantExists_productVariantWantExists {
  __typename: "ProductVariantWantExistsPayload";
  exists: boolean;
}

export interface ProductVariantWantExists {
  productVariantWantExists: ProductVariantWantExists_productVariantWantExists;
}

export interface ProductVariantWantExistsVariables {
  variantID: string;
}
