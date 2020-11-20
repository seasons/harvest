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
}

export interface SignUp_signup_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
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
