/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BagItemProductVariant
// ====================================================

export interface BagItemProductVariant_product_modelSize {
  __typename: "Size";
  display: string;
}

export interface BagItemProductVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface BagItemProductVariant_product_variants_internalSize {
  __typename: "Size";
  display: string;
}

export interface BagItemProductVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  internalSize: BagItemProductVariant_product_variants_internalSize | null;
}

export interface BagItemProductVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: BagItemProductVariant_product_modelSize | null;
  brand: BagItemProductVariant_product_brand;
  images: any;
  variants: BagItemProductVariant_product_variants[] | null;
}

export interface BagItemProductVariant {
  __typename: "ProductVariant";
  product: BagItemProductVariant_product;
}
