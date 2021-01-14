/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HomePageProduct
// ====================================================

export interface HomePageProduct_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface HomePageProduct_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface HomePageProduct_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface HomePageProduct_variants_display {
  __typename: "ProductVariantDisplay";
  short: string | null;
}

export interface HomePageProduct_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  display: HomePageProduct_variants_display | null;
}

export interface HomePageProduct {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: HomePageProduct_modelSize | null;
  brand: HomePageProduct_brand;
  images: HomePageProduct_images[];
  variants: HomePageProduct_variants[] | null;
}
