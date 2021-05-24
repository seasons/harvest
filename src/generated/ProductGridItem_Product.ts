/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, LetterSize } from "./globalTypes";

// ====================================================
// GraphQL fragment: ProductGridItem_Product
// ====================================================

export interface ProductGridItem_Product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface ProductGridItem_Product_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface ProductGridItem_Product_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface ProductGridItem_Product_variants_internalSize {
  __typename: "Size";
  id: string;
  top: ProductGridItem_Product_variants_internalSize_top | null;
  bottom: ProductGridItem_Product_variants_internalSize_bottom | null;
}

export interface ProductGridItem_Product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
  isSaved: boolean;
  internalSize: ProductGridItem_Product_variants_internalSize | null;
}

export interface ProductGridItem_Product_extraLargeImages {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface ProductGridItem_Product {
  __typename: "Product";
  id: string;
  slug: string;
  retailPrice: number | null;
  brand: ProductGridItem_Product_brand;
  variants: ProductGridItem_Product_variants[] | null;
  extraLargeImages: ProductGridItem_Product_extraLargeImages[];
  description: string | null;
  name: string;
  type: ProductType | null;
}
