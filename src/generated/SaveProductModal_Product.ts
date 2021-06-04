/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, LetterSize } from "./globalTypes";

// ====================================================
// GraphQL fragment: SaveProductModal_Product
// ====================================================

export interface SaveProductModal_Product_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface SaveProductModal_Product_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface SaveProductModal_Product_variants_internalSize {
  __typename: "Size";
  id: string;
  top: SaveProductModal_Product_variants_internalSize_top | null;
  bottom: SaveProductModal_Product_variants_internalSize_bottom | null;
}

export interface SaveProductModal_Product_variants {
  __typename: "ProductVariant";
  id: string;
  isSaved: boolean;
  internalSize: SaveProductModal_Product_variants_internalSize | null;
}

export interface SaveProductModal_Product_extraLargeImages {
  __typename: "Image";
  url: string | null;
}

export interface SaveProductModal_Product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface SaveProductModal_Product {
  __typename: "Product";
  id: string;
  description: string | null;
  name: string;
  type: ProductType | null;
  variants: SaveProductModal_Product_variants[] | null;
  extraLargeImages: SaveProductModal_Product_extraLargeImages[];
  brand: SaveProductModal_Product_brand;
}
