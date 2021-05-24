/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingCode } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderFragment_Customer
// ====================================================

export interface OrderFragment_Customer_detail_shippingAddress_shippingOptions_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  code: ShippingCode;
  displayText: string;
}

export interface OrderFragment_Customer_detail_shippingAddress_shippingOptions {
  __typename: "ShippingOption";
  id: string;
  externalCost: number | null;
  averageDuration: number | null;
  shippingMethod: OrderFragment_Customer_detail_shippingAddress_shippingOptions_shippingMethod | null;
}

export interface OrderFragment_Customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string;
  shippingOptions: OrderFragment_Customer_detail_shippingAddress_shippingOptions[] | null;
}

export interface OrderFragment_Customer_detail {
  __typename: "CustomerDetail";
  id: string;
  phoneNumber: string | null;
  shippingAddress: OrderFragment_Customer_detail_shippingAddress | null;
}

export interface OrderFragment_Customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
  brand: string;
  last_digits: string;
}

export interface OrderFragment_Customer {
  __typename: "Customer";
  id: string;
  detail: OrderFragment_Customer_detail | null;
  billingInfo: OrderFragment_Customer_billingInfo | null;
}
