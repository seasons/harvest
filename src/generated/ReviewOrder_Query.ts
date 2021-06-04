/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReviewOrder_Query
// ====================================================

export interface ReviewOrder_Query_me_customer_detail_shippingAddress_shippingOptions_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  code: ShippingCode;
  displayText: string;
}

export interface ReviewOrder_Query_me_customer_detail_shippingAddress_shippingOptions {
  __typename: "ShippingOption";
  id: string;
  externalCost: number | null;
  averageDuration: number | null;
  shippingMethod: ReviewOrder_Query_me_customer_detail_shippingAddress_shippingOptions_shippingMethod | null;
}

export interface ReviewOrder_Query_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string;
  shippingOptions: ReviewOrder_Query_me_customer_detail_shippingAddress_shippingOptions[] | null;
}

export interface ReviewOrder_Query_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  phoneNumber: string | null;
  shippingAddress: ReviewOrder_Query_me_customer_detail_shippingAddress | null;
}

export interface ReviewOrder_Query_me_customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
  brand: string;
  last_digits: string;
}

export interface ReviewOrder_Query_me_customer {
  __typename: "Customer";
  id: string;
  detail: ReviewOrder_Query_me_customer_detail | null;
  billingInfo: ReviewOrder_Query_me_customer_billingInfo | null;
}

export interface ReviewOrder_Query_me {
  __typename: "Me";
  id: string | null;
  customer: ReviewOrder_Query_me_customer | null;
}

export interface ReviewOrder_Query {
  me: ReviewOrder_Query_me | null;
}
