/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPreferences
// ====================================================

export interface GetUserPreferences_me_customer_user {
  __typename: "User";
  id: string;
  createdAt: any;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetUserPreferences_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  name: string | null;
  address1: string | null;
  address2: string | null;
  zipCode: string;
  city: string | null;
  state: string | null;
}

export interface GetUserPreferences_me_customer_detail_stylePreferences {
  __typename: "StylePreferences";
  id: string;
  styles: string[];
  patterns: string[];
  colors: string[];
  brands: string[];
}

export interface GetUserPreferences_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  height: number | null;
  weight: number[];
  topSizes: string[];
  waistSizes: number[];
  phoneNumber: string | null;
  shippingAddress: GetUserPreferences_me_customer_detail_shippingAddress | null;
  stylePreferences: GetUserPreferences_me_customer_detail_stylePreferences | null;
}

export interface GetUserPreferences_me_customer {
  __typename: "Customer";
  id: string;
  user: GetUserPreferences_me_customer_user;
  detail: GetUserPreferences_me_customer_detail | null;
}

export interface GetUserPreferences_me {
  __typename: "Me";
  id: string;
  customer: GetUserPreferences_me_customer | null;
}

export interface GetUserPreferences {
  me: GetUserPreferences_me | null;
}
