/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductWhereInput, CustomerStatus, ProductType, LetterSize, BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_me_customer_user {
  __typename: "User";
  id: string;
}

export interface GetProduct_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  itemCount: number | null;
}

export interface GetProduct_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: GetProduct_me_customer_membership_plan | null;
}

export interface GetProduct_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  user: GetProduct_me_customer_user;
  membership: GetProduct_me_customer_membership | null;
}

export interface GetProduct_me_bag {
  __typename: "BagItem";
  id: string;
}

export interface GetProduct_me_savedItems {
  __typename: "BagItem";
  id: string;
}

export interface GetProduct_me {
  __typename: "Me";
  customer: GetProduct_me_customer | null;
  bag: GetProduct_me_bag[] | null;
  savedItems: GetProduct_me_savedItems[] | null;
}

export interface GetProduct_products_modelSize {
  __typename: "Size";
  id: string;
  display: string;
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

export interface GetProduct_products_brand_products_variants_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetProduct_products_brand_products_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetProduct_products_brand_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetProduct_products_brand_products_variants_internalSize {
  __typename: "Size";
  id: string;
  productType: ProductType | null;
  display: string;
  top: GetProduct_products_brand_products_variants_internalSize_top | null;
  bottom: GetProduct_products_brand_products_variants_internalSize_bottom | null;
}

export interface GetProduct_products_brand_products_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  hasRestockNotification: boolean;
  manufacturerSizes: GetProduct_products_brand_products_variants_manufacturerSizes[] | null;
  internalSize: GetProduct_products_brand_products_variants_internalSize | null;
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
  products: GetProduct_products_brand_products[] | null;
}

export interface GetProduct_products_largeImages {
  __typename: "Image";
  imageId: string;
  url: string | null;
}

export interface GetProduct_products_variants_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetProduct_products_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetProduct_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
  value: string | null;
}

export interface GetProduct_products_variants_internalSize {
  __typename: "Size";
  id: string;
  productType: ProductType | null;
  display: string;
  top: GetProduct_products_variants_internalSize_top | null;
  bottom: GetProduct_products_variants_internalSize_bottom | null;
}

export interface GetProduct_products_variants {
  __typename: "ProductVariant";
  id: string;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  hasRestockNotification: boolean;
  manufacturerSizes: GetProduct_products_variants_manufacturerSizes[] | null;
  internalSize: GetProduct_products_variants_internalSize | null;
}

export interface GetProduct_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  description: string | null;
  retailPrice: number | null;
  modelSize: GetProduct_products_modelSize | null;
  modelHeight: number | null;
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
  me: GetProduct_me | null;
  products: (GetProduct_products | null)[];
}

export interface GetProductVariables {
  where: ProductWhereInput;
}
