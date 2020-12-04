/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLocalBagItems
// ====================================================

export interface GetLocalBagItems_products_variants_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetLocalBagItems_products_variants_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetLocalBagItems_products_variants_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetLocalBagItems_products_variants_product_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetLocalBagItems_products_variants_product_variants {
  __typename: "ProductVariant";
  id: string;
  hasRestockNotification: boolean;
  reservable: number;
  internalSize: GetLocalBagItems_products_variants_product_variants_internalSize | null;
}

export interface GetLocalBagItems_products_variants_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: GetLocalBagItems_products_variants_product_modelSize | null;
  brand: GetLocalBagItems_products_variants_product_brand;
  images: GetLocalBagItems_products_variants_product_images[];
  variants: GetLocalBagItems_products_variants_product_variants[] | null;
}

export interface GetLocalBagItems_products_variants {
  __typename: "ProductVariant";
  id: string;
  product: GetLocalBagItems_products_variants_product;
}

export interface GetLocalBagItems_products {
  __typename: "Product";
  id: string;
  variants: GetLocalBagItems_products_variants[] | null;
}

export interface GetLocalBagItems {
  products: (GetLocalBagItems_products | null)[];
}

export interface GetLocalBagItemsVariables {
  ids?: string[] | null;
}
