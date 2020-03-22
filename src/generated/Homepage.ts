/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HomePageSectionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: Homepage
// ====================================================

export interface Homepage_homepage_sections_results_Collection {
  __typename: "Collection";
}

export interface Homepage_homepage_sections_results_Brand {
  __typename: "Brand";
  id: string;
  name: string;
  since: any | null;
}

export interface Homepage_homepage_sections_results_Product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface Homepage_homepage_sections_results_Product_variants {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
  reservable: number;
}

export interface Homepage_homepage_sections_results_Product {
  __typename: "Product";
  id: string;
  slug: string;
  images: any;
  brand: Homepage_homepage_sections_results_Product_brand;
  variants: Homepage_homepage_sections_results_Product_variants[] | null;
}

export type Homepage_homepage_sections_results = Homepage_homepage_sections_results_Collection | Homepage_homepage_sections_results_Brand | Homepage_homepage_sections_results_Product;

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
