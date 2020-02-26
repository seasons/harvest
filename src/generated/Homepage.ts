/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HomePageSectionType, Size } from "./globalTypes";

// ====================================================
// GraphQL query operation: Homepage
// ====================================================

export interface Homepage_homepage_sections_results_HomepageProductRail {
  __typename: "HomepageProductRail" | "Collection";
}

export interface Homepage_homepage_sections_results_Product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_homepage_sections_results_Product_variants {
  __typename: "ProductVariant";
  size: Size;
  id: string;
  reservable: number;
}

export interface Homepage_homepage_sections_results_Product {
  __typename: "Product";
  id: string;
  images: any;
  brand: Homepage_homepage_sections_results_Product_brand;
  variants: Homepage_homepage_sections_results_Product_variants[] | null;
}

export type Homepage_homepage_sections_results = Homepage_homepage_sections_results_HomepageProductRail | Homepage_homepage_sections_results_Product;

export interface Homepage_homepage_sections {
  __typename: "HomepageSection";
  title: string | null;
  type: HomePageSectionType;
  results: Homepage_homepage_sections_results[];
}

export interface Homepage_homepage {
  __typename: "Homepage";
  sections: Homepage_homepage_sections[];
}

export interface Homepage {
  homepage: Homepage_homepage | null;
}
