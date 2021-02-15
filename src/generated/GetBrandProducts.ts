/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LetterSize, BottomSizeType, ProductType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrandProducts
// ====================================================

export interface GetBrandProducts_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBrandProducts_products_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetBrandProducts_products_variants_manufacturerSizes {
  __typename: "Size";
  display: string;
}

export interface GetBrandProducts_products_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetBrandProducts_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetBrandProducts_products_variants_internalSize {
  __typename: "Size";
  top: GetBrandProducts_products_variants_internalSize_top | null;
  bottom: GetBrandProducts_products_variants_internalSize_bottom | null;
  productType: ProductType | null;
  display: string;
}

export interface GetBrandProducts_products_variants {
  __typename: "ProductVariant";
  id: string;
  manufacturerSizes: GetBrandProducts_products_variants_manufacturerSizes[] | null;
  internalSize: GetBrandProducts_products_variants_internalSize | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  isWanted: boolean;
}

export interface GetBrandProducts_products {
  __typename: "Product";
  id: string;
  images: GetBrandProducts_products_images[];
  brand: GetBrandProducts_products_brand;
  variants: GetBrandProducts_products_variants[] | null;
}

export interface GetBrandProducts {
  products: (GetBrandProducts_products | null)[];
}

export interface GetBrandProductsVariables {
  brandID: string;
  excludeProductID: string;
}
