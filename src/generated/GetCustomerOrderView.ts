/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCustomerOrderView
// ====================================================

export interface GetCustomerOrderView_me_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetCustomerOrderView_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  allAccessEnabled: boolean;
}

export interface GetCustomerOrderView_me_customer_detail_shippingAddress_shippingOptions_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  code: ShippingCode;
  displayText: string;
}

export interface GetCustomerOrderView_me_customer_detail_shippingAddress_shippingOptions {
  __typename: "ShippingOption";
  id: string;
  externalCost: number | null;
  averageDuration: number | null;
  shippingMethod: GetCustomerOrderView_me_customer_detail_shippingAddress_shippingOptions_shippingMethod | null;
}

export interface GetCustomerOrderView_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string;
  shippingOptions: GetCustomerOrderView_me_customer_detail_shippingAddress_shippingOptions[] | null;
}

export interface GetCustomerOrderView_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  phoneNumber: string | null;
  shippingAddress: GetCustomerOrderView_me_customer_detail_shippingAddress | null;
}

export interface GetCustomerOrderView_me_customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
  brand: string;
  last_digits: string;
}

export interface GetCustomerOrderView_me_customer {
  __typename: "Customer";
  id: string;
  admissions: GetCustomerOrderView_me_customer_admissions | null;
  detail: GetCustomerOrderView_me_customer_detail | null;
  billingInfo: GetCustomerOrderView_me_customer_billingInfo | null;
}

export interface GetCustomerOrderView_me {
  __typename: "Me";
  user: GetCustomerOrderView_me_user | null;
  customer: GetCustomerOrderView_me_customer | null;
}

export interface GetCustomerOrderView {
  me: GetCustomerOrderView_me | null;
}
