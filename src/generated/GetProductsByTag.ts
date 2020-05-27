/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, LetterSize, BottomSizeType, ProductType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductsByTag
// ====================================================

export interface GetProductsByTag_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetProductsByTag_products_variants_internalSize_top {
  __typename: "TopSize";
  letter: LetterSize | null;
}

export interface GetProductsByTag_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetProductsByTag_products_variants_internalSize {
  __typename: "Size";
  top: GetProductsByTag_products_variants_internalSize_top | null;
  bottom: GetProductsByTag_products_variants_internalSize_bottom | null;
  productType: ProductType | null;
  display: string;
}

export interface GetProductsByTag_products_variants {
  __typename: "ProductVariant";
  id: string;
  internalSize: GetProductsByTag_products_variants_internalSize | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
}

export interface GetProductsByTag_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: GetProductsByTag_products_images[];
  variants: GetProductsByTag_products_variants[] | null;
}

export interface GetProductsByTag {
  products: (GetProductsByTag_products | null)[];
}

export interface GetProductsByTagVariables {
  tag: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
