/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_login_customer_admissions {
  __typename: "CustomerAdmissionsData";
  admissable: boolean;
}

export interface LogIn_login_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  admissions: LogIn_login_customer_admissions | null;
}

export interface LogIn_login_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  beamsToken: string;
  roles: UserRole[];
}

export interface LogIn_login {
  __typename: "AuthPayload";
  customer: LogIn_login_customer;
  user: LogIn_login_user;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LogIn {
  login: LogIn_login;
}

export interface LogInVariables {
  email: string;
  password: string;
}
