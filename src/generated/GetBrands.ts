/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BrandOrderByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrands
// ====================================================

export interface GetBrands_brands {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBrands {
  brands: (GetBrands_brands | null)[];
}

export interface GetBrandsVariables {
  first: number;
  skip: number;
  orderBy: BrandOrderByInput;
}
