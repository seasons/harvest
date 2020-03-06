/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_login_user {
  __typename: "User";
  email: string;
  firstName: string;
  lastName: string;
}

export interface LogIn_login {
  __typename: "AuthPayload";
  user: LogIn_login_user;
  token: string;
  refreshToken: string;
  expiresIn: number;
  beamsToken: string;
}

export interface LogIn {
  login: LogIn_login;
}

export interface LogInVariables {
  email: string;
  password: string;
}
