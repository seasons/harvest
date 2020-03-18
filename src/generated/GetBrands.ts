/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BrandOrderByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrands
// ====================================================

export interface GetBrands_brands_products {
  __typename: "Product";
  id: string;
}

export interface GetBrands_brands {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
  products: GetBrands_brands_products[] | null;
}

export interface GetBrands {
  brands: (GetBrands_brands | null)[];
}

export interface GetBrandsVariables {
  orderBy: BrandOrderByInput;
}
