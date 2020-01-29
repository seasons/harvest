/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LocationType, Plan } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBillingInfo
// ====================================================

export interface GetBillingInfo_me_customer_detail_shippingAddress {
  __typename: "Location";
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
  locationType: LocationType | null;
}

export interface GetBillingInfo_me_customer_detail {
  __typename: "CustomerDetail";
  shippingAddress: GetBillingInfo_me_customer_detail_shippingAddress | null;
}

export interface GetBillingInfo_me_customer_billingInfo {
  __typename: "BillingInfo";
  brand: string;
  name: string | null;
  last_digits: string;
  expiration_month: number;
  expiration_year: number;
  street1: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
}

export interface GetBillingInfo_me_customer {
  __typename: "Customer";
  detail: GetBillingInfo_me_customer_detail | null;
  plan: Plan | null;
  billingInfo: GetBillingInfo_me_customer_billingInfo | null;
}

export interface GetBillingInfo_me {
  __typename: "Me";
  customer: GetBillingInfo_me_customer;
}

export interface GetBillingInfo {
  me: GetBillingInfo_me | null;
}
