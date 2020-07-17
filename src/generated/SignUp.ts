/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

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

export interface SignUp_signup {
  __typename: "AuthPayload";
  user: SignUp_signup_user;
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
