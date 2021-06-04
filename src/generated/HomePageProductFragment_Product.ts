/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HomePageProductFragment_Product
// ====================================================

export interface HomePageProductFragment_Product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface HomePageProductFragment_Product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface HomePageProductFragment_Product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface HomePageProductFragment_Product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
}

export interface HomePageProductFragment_Product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: HomePageProductFragment_Product_modelSize | null;
  brand: HomePageProductFragment_Product_brand;
  images: HomePageProductFragment_Product_images[];
  variants: HomePageProductFragment_Product_variants[] | null;
}
