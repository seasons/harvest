/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { HomePageSectionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: Homepage
// ====================================================

export interface Homepage_categories_children {
  __typename: "Category";
  slug: string;
}

export interface Homepage_categories {
  __typename: "Category";
  id: string;
  slug: string;
  name: string;
  image: any | null;
  children: Homepage_categories_children[] | null;
}

export interface Homepage_homepage_sections_results_Category {
  __typename: "Category" | "Brand";
}

export interface Homepage_homepage_sections_results_Collection {
  __typename: "Collection";
  id: string;
  slug: string;
  images: any;
  title: string | null;
  subTitle: string | null;
}

export interface Homepage_homepage_sections_results_Product_brand {
  __typename: "Brand";
  name: string;
}

export interface Homepage_homepage_sections_results_Product_color {
  __typename: "Color";
  name: string;
}

export interface Homepage_homepage_sections_results_Product {
  __typename: "Product";
  id: string;
  images: any;
  brand: Homepage_homepage_sections_results_Product_brand;
  name: string;
  color: Homepage_homepage_sections_results_Product_color;
  retailPrice: number | null;
}

export type Homepage_homepage_sections_results = Homepage_homepage_sections_results_Category | Homepage_homepage_sections_results_Collection | Homepage_homepage_sections_results_Product;

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
  categories: (Homepage_categories | null)[];
  homepage: Homepage_homepage | null;
}
