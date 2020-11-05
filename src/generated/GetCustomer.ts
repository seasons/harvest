/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCustomer
// ====================================================

export interface GetCustomer_me_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetCustomer_me_bag_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetCustomer_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetCustomer_me_bag_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCustomer_me_bag_productVariant_product_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetCustomer_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  internalSize: GetCustomer_me_bag_productVariant_product_variants_internalSize | null;
}

export interface GetCustomer_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
  name: string;
  modelSize: GetCustomer_me_bag_productVariant_product_modelSize | null;
  brand: GetCustomer_me_bag_productVariant_product_brand;
  images: GetCustomer_me_bag_productVariant_product_images[];
  variants: GetCustomer_me_bag_productVariant_product_variants[] | null;
}

export interface GetCustomer_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetCustomer_me_bag_productVariant_product;
}

export interface GetCustomer_me_bag {
  __typename: "BagItem";
  id: string;
  productVariant: GetCustomer_me_bag_productVariant;
}

export interface GetCustomer_me_customer_detail_shippingAddress_shippingOptions_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  code: ShippingCode;
  displayText: string;
}

export interface GetCustomer_me_customer_detail_shippingAddress_shippingOptions {
  __typename: "ShippingOption";
  id: string;
  externalCost: number | null;
  averageDuration: number | null;
  shippingMethod: GetCustomer_me_customer_detail_shippingAddress_shippingOptions_shippingMethod | null;
}

export interface GetCustomer_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string;
  shippingOptions: GetCustomer_me_customer_detail_shippingAddress_shippingOptions[] | null;
}

export interface GetCustomer_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  phoneNumber: string | null;
  shippingAddress: GetCustomer_me_customer_detail_shippingAddress | null;
}

export interface GetCustomer_me_customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
  last_digits: string;
}

export interface GetCustomer_me_customer {
  __typename: "Customer";
  id: string;
  detail: GetCustomer_me_customer_detail | null;
  billingInfo: GetCustomer_me_customer_billingInfo | null;
}

export interface GetCustomer_me {
  __typename: "Me";
  user: GetCustomer_me_user | null;
  bag: GetCustomer_me_bag[] | null;
  customer: GetCustomer_me_customer | null;
}

export interface GetCustomer {
  me: GetCustomer_me | null;
}
