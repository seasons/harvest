/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, ProductStatus, LetterSize, BottomSizeType, ProductType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrandAndProducts
// ====================================================

export interface GetBrandAndProducts_brand_products_variants_internalSize_top {
  __typename: "TopSize";
  letter: LetterSize | null;
}

export interface GetBrandAndProducts_brand_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetBrandAndProducts_brand_products_variants_internalSize {
  __typename: "Size";
  top: GetBrandAndProducts_brand_products_variants_internalSize_top | null;
  bottom: GetBrandAndProducts_brand_products_variants_internalSize_bottom | null;
  productType: ProductType | null;
  display: string;
}

export interface GetBrandAndProducts_brand_products_variants {
  __typename: "ProductVariant";
  id: string;
  internalSize: GetBrandAndProducts_brand_products_variants_internalSize | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
}

export interface GetBrandAndProducts_brand_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  images: any;
  modelHeight: number | null;
  externalURL: string | null;
  tags: any | null;
  retailPrice: number | null;
  status: ProductStatus | null;
  createdAt: any;
  updatedAt: any;
  variants: GetBrandAndProducts_brand_products_variants[] | null;
}

export interface GetBrandAndProducts_brand {
  __typename: "Brand";
  id: string;
  name: string;
  basedIn: string | null;
  description: string | null;
  products: GetBrandAndProducts_brand_products[] | null;
}

export interface GetBrandAndProducts {
  brand: GetBrandAndProducts_brand | null;
}

export interface GetBrandAndProductsVariables {
  brandID: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
