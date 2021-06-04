/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LaunchCalendarFragment_Query
// ====================================================

export interface LaunchCalendarFragment_Query_launches_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface LaunchCalendarFragment_Query_launches_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  published: boolean;
  websiteUrl: string | null;
  name: string;
  logoImage: LaunchCalendarFragment_Query_launches_brand_logoImage | null;
}

export interface LaunchCalendarFragment_Query_launches_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  title: string | null;
}

export interface LaunchCalendarFragment_Query_launches {
  __typename: "Launch";
  id: string;
  launchAt: any;
  brand: LaunchCalendarFragment_Query_launches_brand | null;
  collection: LaunchCalendarFragment_Query_launches_collection | null;
}

export interface LaunchCalendarFragment_Query {
  __typename: "Query";
  launches: (LaunchCalendarFragment_Query_launches | null)[];
}
