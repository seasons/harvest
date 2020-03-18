/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomer
// ====================================================

export interface GetCustomer_me_user {
  __typename: "User";
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetCustomer_me_bag_productVariant_product_modelSize {
  __typename: "Size";
  display: string;
}

export interface GetCustomer_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface GetCustomer_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
}

export interface GetCustomer_me_bag_productVariant_product {
  __typename: "Product";
  name: string;
  id: string;
  modelSize: GetCustomer_me_bag_productVariant_product_modelSize | null;
  brand: GetCustomer_me_bag_productVariant_product_brand;
  images: any;
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

export interface GetCustomer_me_customer_detail_shippingAddress {
  __typename: "Location";
  slug: string;
  name: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export interface GetCustomer_me_customer_detail {
  __typename: "CustomerDetail";
  phoneNumber: string | null;
  shippingAddress: GetCustomer_me_customer_detail_shippingAddress | null;
}

export interface GetCustomer_me_customer_billingInfo {
  __typename: "BillingInfo";
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
  user: GetCustomer_me_user;
  bag: GetCustomer_me_bag[];
  customer: GetCustomer_me_customer;
}

export interface GetCustomer {
  me: GetCustomer_me | null;
}
