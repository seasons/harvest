/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

<<<<<<< HEAD
import { Material } from "./globalTypes";
=======
import { Material, LetterSize, BottomSizeType, ProductType } from "./globalTypes"
>>>>>>> nest

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_product_modelSize {
<<<<<<< HEAD
  __typename: "Size";
  display: string;
=======
  __typename: "Size"
  display: string
>>>>>>> nest
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
<<<<<<< HEAD
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
  logo: any | null;
  since: any | null;
}

export interface GetProduct_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
  isWanted: boolean;
}

export interface GetProduct_product {
  __typename: "Product";
  id: string;
  name: string;
  description: string | null;
  retailPrice: number | null;
  modelSize: GetProduct_product_modelSize | null;
  modelHeight: number | null;
  color: GetProduct_product_color;
  secondaryColor: GetProduct_product_secondaryColor | null;
  brand: GetProduct_product_brand;
  outerMaterials: Material[];
  innerMaterials: Material[];
  images: any;
  isSaved: boolean | null;
  variants: GetProduct_product_variants[] | null;
=======
  __typename: "Brand"
  id: string
  slug: string
  name: string
  logo: any | null
  since: any | null
}

export interface GetProduct_product_variants_internalSize_top {
  __typename: "TopSize"
  letter: LetterSize | null
}

export interface GetProduct_product_variants_internalSize_bottom {
  __typename: "BottomSize"
  type: BottomSizeType | null
  value: string | null
}

export interface GetProduct_product_variants_internalSize {
  __typename: "Size"
  top: GetProduct_product_variants_internalSize_top | null
  bottom: GetProduct_product_variants_internalSize_bottom | null
  productType: ProductType | null
  display: string
}

export interface GetProduct_product_variants {
  __typename: "ProductVariant"
  id: string
  internalSize: GetProduct_product_variants_internalSize | null
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
>>>>>>> nest
}

export interface GetProduct {
  product: GetProduct_product | null
}

export interface GetProductVariables {
  productID: string
}
