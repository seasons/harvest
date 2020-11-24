/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signup_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  beamsToken: string;
  roles: UserRole[];
  createdAt: any;
}

export interface SignUp_signup_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  state: string | null;
}

export interface SignUp_signup_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: SignUp_signup_customer_detail_shippingAddress | null;
}

export interface SignUp_signup_customer_bagItems {
  __typename: "BagItem";
  id: string;
}

export interface SignUp_signup_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  detail: SignUp_signup_customer_detail | null;
  bagItems: SignUp_signup_customer_bagItems[] | null;
}

export interface SignUp_signup {
  __typename: "SignupPayload";
  user: SignUp_signup_user;
  customer: SignUp_signup_customer;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface SignUp {
  signup: SignUp_signup;
}

export interface SignUpVariables {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  zipCode: string;
}
