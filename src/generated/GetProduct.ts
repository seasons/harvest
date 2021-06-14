/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductWhereInput, ProductFit, SizeType, ProductType, LetterSize, BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_products_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface GetProduct_products_modelSize {
  __typename: "Size";
  id: string;
  display: string;
  type: SizeType | null;
}

export interface GetProduct_products_color {
  __typename: "Color";
  id: string;
  name: string;
}

export interface GetProduct_products_secondaryColor {
  __typename: "Color";
  id: string;
  name: string;
}

export interface GetProduct_products_brand_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetProduct_products_brand_products_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetProduct_products_brand_products_variants_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyNewPrice: number | null;
  buyUsedAvailableForSale: boolean | null;
  buyNewAvailableForSale: boolean | null;
  buyNewEnabled: boolean;
  buyUsedEnabled: boolean;
  buyUsedPrice: number | null;
}

export interface GetProduct_products_brand_products_variants_manufacturerSizes_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetProduct_products_brand_products_variants_manufacturerSizes_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
  waist: number | null;
  rise: number | null;
  hem: number | null;
  inseam: number | null;
}

export interface GetProduct_products_brand_products_variants_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
  type: SizeType | null;
  top: GetProduct_products_brand_products_variants_manufacturerSizes_top | null;
  bottom: GetProduct_products_brand_products_variants_manufacturerSizes_bottom | null;
}

export interface GetProduct_products_brand_products_variants_nextReservablePhysicalProduct_reports {
  __typename: "PhysicalProductQualityReport";
  id: string;
  createdAt: any;
  published: boolean;
  score: number | null;
  notes: string | null;
}

export interface GetProduct_products_brand_products_variants_nextReservablePhysicalProduct {
  __typename: "PhysicalProduct";
  id: string;
  reports: GetProduct_products_brand_products_variants_nextReservablePhysicalProduct_reports[] | null;
}

export interface GetProduct_products_brand_products_variants {
  __typename: "ProductVariant";
  id: string;
  displayLong: string | null;
  displayShort: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  hasRestockNotification: boolean;
  price: GetProduct_products_brand_products_variants_price;
  manufacturerSizes: GetProduct_products_brand_products_variants_manufacturerSizes[] | null;
  nextReservablePhysicalProduct: GetProduct_products_brand_products_variants_nextReservablePhysicalProduct | null;
}

export interface GetProduct_products_brand_products {
  __typename: "Product";
  id: string;
  type: ProductType | null;
  images: GetProduct_products_brand_products_images[];
  brand: GetProduct_products_brand_products_brand;
  variants: GetProduct_products_brand_products_variants[] | null;
}

export interface GetProduct_products_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
  logo: any | null;
  since: any | null;
  websiteUrl: string | null;
  products: GetProduct_products_brand_products[] | null;
}

export interface GetProduct_products_largeImages {
  __typename: "Image";
  imageId: string;
  url: string | null;
}

export interface GetProduct_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  waist: number | null;
  rise: number | null;
  hem: number | null;
  inseam: number | null;
}

export interface GetProduct_products_variants_internalSize_accessory {
  __typename: "AccessorySize";
  id: string;
  bridge: number | null;
  length: number | null;
  width: number | null;
}

export interface GetProduct_products_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  length: number | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
}

export interface GetProduct_products_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
  type: SizeType | null;
  bottom: GetProduct_products_variants_internalSize_bottom | null;
  accessory: GetProduct_products_variants_internalSize_accessory | null;
  top: GetProduct_products_variants_internalSize_top | null;
}

export interface GetProduct_products_variants_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyNewPrice: number | null;
  buyUsedAvailableForSale: boolean | null;
  buyNewAvailableForSale: boolean | null;
  buyNewEnabled: boolean;
  buyUsedEnabled: boolean;
  buyUsedPrice: number | null;
}

export interface GetProduct_products_variants_manufacturerSizes_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetProduct_products_variants_manufacturerSizes_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
  waist: number | null;
  rise: number | null;
  hem: number | null;
  inseam: number | null;
}

export interface GetProduct_products_variants_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
  type: SizeType | null;
  top: GetProduct_products_variants_manufacturerSizes_top | null;
  bottom: GetProduct_products_variants_manufacturerSizes_bottom | null;
}

export interface GetProduct_products_variants_nextReservablePhysicalProduct_reports {
  __typename: "PhysicalProductQualityReport";
  id: string;
  createdAt: any;
  published: boolean;
  score: number | null;
  notes: string | null;
}

export interface GetProduct_products_variants_nextReservablePhysicalProduct {
  __typename: "PhysicalProduct";
  id: string;
  reports: GetProduct_products_variants_nextReservablePhysicalProduct_reports[] | null;
}

export interface GetProduct_products_variants {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  internalSize: GetProduct_products_variants_internalSize | null;
  displayLong: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  hasRestockNotification: boolean;
  price: GetProduct_products_variants_price;
  manufacturerSizes: GetProduct_products_variants_manufacturerSizes[] | null;
  nextReservablePhysicalProduct: GetProduct_products_variants_nextReservablePhysicalProduct | null;
}

export interface GetProduct_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  productFit: ProductFit | null;
  modelHeight: number | null;
  category: GetProduct_products_category;
  description: string | null;
  retailPrice: number | null;
  modelSize: GetProduct_products_modelSize | null;
  color: GetProduct_products_color;
  secondaryColor: GetProduct_products_secondaryColor | null;
  brand: GetProduct_products_brand;
  outerMaterials: string[];
  innerMaterials: string[];
  largeImages: GetProduct_products_largeImages[];
  type: ProductType | null;
  variants: GetProduct_products_variants[] | null;
}

export interface GetProduct {
  products: (GetProduct_products | null)[];
}

export interface GetProductVariables {
  where: ProductWhereInput;
}
