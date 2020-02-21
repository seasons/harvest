/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddViewedProduct
// ====================================================

export interface AddViewedProduct_addViewedProduct {
  __typename: "RecentlyViewedProduct";
  id: string;
  viewCount: number;
}

export interface AddViewedProduct {
  addViewedProduct: AddViewedProduct_addViewedProduct;
}

export interface AddViewedProductVariables {
  item: string;
}
