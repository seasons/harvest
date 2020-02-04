/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddProductRequest
// ====================================================

export interface AddProductRequest_addProductRequest {
  __typename: "ProductRequest";
  id: string;
  sku: string | null;
  brand: string | null;
  description: string | null;
  images: string[];
  name: string | null;
  price: number | null;
  priceCurrency: string | null;
  productID: string | null;
  url: string;
}

export interface AddProductRequest {
  addProductRequest: AddProductRequest_addProductRequest;
}

export interface AddProductRequestVariables {
  reason: string;
  url: string;
}
