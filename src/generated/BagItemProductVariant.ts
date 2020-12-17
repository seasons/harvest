/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BagItemProductVariant
// ====================================================

export interface BagItemProductVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface BagItemProductVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface BagItemProductVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface BagItemProductVariant_product_variants_display {
  __typename: "ProductVariantDisplay";
  short: string | null;
  long: string | null;
}

export interface BagItemProductVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  hasRestockNotification: boolean;
  reservable: number;
  display: BagItemProductVariant_product_variants_display | null;
}

export interface BagItemProductVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: BagItemProductVariant_product_modelSize | null;
  brand: BagItemProductVariant_product_brand;
  images: BagItemProductVariant_product_images[];
  variants: BagItemProductVariant_product_variants[] | null;
}

export interface BagItemProductVariant {
  __typename: "ProductVariant";
  product: BagItemProductVariant_product;
}
