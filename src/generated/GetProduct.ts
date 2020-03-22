/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Material } from "./globalTypes"

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_product_modelSize {
  __typename: "Size"
  display: string
}

export interface GetProduct_product_color {
  __typename: "Color"
  id: string
  name: string
}

export interface GetProduct_product_secondaryColor {
  __typename: "Color"
  id: string
  name: string
}

export interface GetProduct_product_brand {
  __typename: "Brand"
  id: string
  slug: string
  name: string
  logo: any | null
  since: any | null
}

export interface GetProduct_product_variants {
  __typename: "ProductVariant"
  id: string
  size: string | null
  total: number
  reservable: number
  nonReservable: number
  reserved: number
  isSaved: boolean
  isWanted: boolean
}

export interface GetProduct_product {
  __typename: "Product"
  id: string
  name: string
  description: string | null
  retailPrice: number | null
  modelSize: GetProduct_product_modelSize | null
  modelHeight: number | null
  color: GetProduct_product_color
  secondaryColor: GetProduct_product_secondaryColor | null
  brand: GetProduct_product_brand
  outerMaterials: Material[]
  innerMaterials: Material[]
  images: any
  isSaved: boolean | null
  variants: GetProduct_product_variants[] | null
}

export interface GetProduct {
  product: GetProduct_product | null
}

export interface GetProductVariables {
  productID: string
}
