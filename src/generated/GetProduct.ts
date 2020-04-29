/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, LetterSize, BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_product_modelSize {
  __typename: "Size";
  display: string;
}

export interface GetProduct_product_color {
  __typename: "Color";
  id: string;
  name: string;
}

export interface GetProduct_product_secondaryColor {
  __typename: "Color";
  id: string;
  name: string;
}

export interface GetProduct_product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
  logo: any | null;
  since: any | null;
}

export interface GetProduct_product_variants_manufacturerSizes {
  __typename: "Size";
  display: string;
}

export interface GetProduct_product_variants_internalSize_top {
  __typename: "TopSize";
  letter: LetterSize | null;
}

export interface GetProduct_product_variants_internalSize_bottom {
  __typename: "BottomSize";
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetProduct_product_variants_internalSize {
  __typename: "Size";
  top: GetProduct_product_variants_internalSize_top | null;
  bottom: GetProduct_product_variants_internalSize_bottom | null;
  productType: ProductType | null;
  display: string;
}

export interface GetProduct_product_variants {
  __typename: "ProductVariant";
  id: string;
  manufacturerSizes: GetProduct_product_variants_manufacturerSizes[] | null;
  internalSize: GetProduct_product_variants_internalSize | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  isWanted: boolean;
}

export interface GetProduct_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  retailPrice: number | null;
  modelSize: GetProduct_product_modelSize | null;
  modelHeight: number | null;
  color: GetProduct_product_color;
  secondaryColor: GetProduct_product_secondaryColor | null;
  brand: GetProduct_product_brand;
  outerMaterials: string[];
  innerMaterials: string[];
  images: any;
  type: ProductType | null;
  variants: GetProduct_product_variants[] | null;
}

export interface GetProduct {
  product: GetProduct_product | null;
}

export interface GetProductVariables {
  productID: string;
}
