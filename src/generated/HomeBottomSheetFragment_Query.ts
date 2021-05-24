/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HomeBottomSheetFragment_Query
// ====================================================

export interface HomeBottomSheetFragment_Query_featuredBrands {
  __typename: "Brand";
  id: string;
  name: string;
  slug: string;
}

export interface HomeBottomSheetFragment_Query_launches_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface HomeBottomSheetFragment_Query_launches_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  published: boolean;
  websiteUrl: string | null;
  name: string;
  logoImage: HomeBottomSheetFragment_Query_launches_brand_logoImage | null;
}

export interface HomeBottomSheetFragment_Query_launches_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  title: string | null;
}

export interface HomeBottomSheetFragment_Query_launches {
  __typename: "Launch";
  id: string;
  launchAt: any;
  brand: HomeBottomSheetFragment_Query_launches_brand | null;
  collection: HomeBottomSheetFragment_Query_launches_collection | null;
}

export interface HomeBottomSheetFragment_Query {
  __typename: "Query";
  featuredBrands: (HomeBottomSheetFragment_Query_featuredBrands | null)[];
  launches: (HomeBottomSheetFragment_Query_launches | null)[];
}
