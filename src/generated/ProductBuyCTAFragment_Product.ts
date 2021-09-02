/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductBuyCTAFragment_Product
// ====================================================

export interface ProductBuyCTAFragment_Product_brand {
  __typename: "Brand";
  id: string;
  name: string;
  websiteUrl: string | null;
}

export interface ProductBuyCTAFragment_Product {
  __typename: "Product";
  id: string;
  brand: ProductBuyCTAFragment_Product_brand;
}
