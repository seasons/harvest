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
  id: string;
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

export interface GetProduct_product_brand_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetProduct_product_brand_products_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetProduct_product_brand_products_variants_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetProduct_product_brand_products_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetProduct_product_brand_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetProduct_product_brand_products_variants_internalSize {
  __typename: "Size";
  id: string;
  productType: ProductType | null;
  display: string;
  top: GetProduct_product_brand_products_variants_internalSize_top | null;
  bottom: GetProduct_product_brand_products_variants_internalSize_bottom | null;
}

export interface GetProduct_product_brand_products_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  isWanted: boolean;
  manufacturerSizes: GetProduct_product_brand_products_variants_manufacturerSizes[] | null;
  internalSize: GetProduct_product_brand_products_variants_internalSize | null;
}

export interface GetProduct_product_brand_products {
  __typename: "Product";
  id: string;
  type: ProductType | null;
  images: GetProduct_product_brand_products_images[];
  brand: GetProduct_product_brand_products_brand;
  variants: GetProduct_product_brand_products_variants[] | null;
}

export interface GetProduct_product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
  logo: any | null;
  since: any | null;
  products: GetProduct_product_brand_products[] | null;
}

export interface GetProduct_product_largeImages {
  __typename: "Image";
  imageId: string;
  url: string | null;
}

export interface GetProduct_product_variants_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetProduct_product_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetProduct_product_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetProduct_product_variants_internalSize {
  __typename: "Size";
  id: string;
  productType: ProductType | null;
  display: string;
  top: GetProduct_product_variants_internalSize_top | null;
  bottom: GetProduct_product_variants_internalSize_bottom | null;
}

export interface GetProduct_product_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  isWanted: boolean;
  manufacturerSizes: GetProduct_product_variants_manufacturerSizes[] | null;
  internalSize: GetProduct_product_variants_internalSize | null;
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
  largeImages: GetProduct_product_largeImages[];
  type: ProductType | null;
  variants: GetProduct_product_variants[] | null;
}

export interface GetProduct {
  product: GetProduct_product | null;
}

export interface GetProductVariables {
  productID: string;
}
