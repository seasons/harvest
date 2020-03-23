/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_resetPassword {
  __typename: "ResetPasswordPayload";
  message: string;
}

export interface ResetPassword {
  resetPassword: ResetPassword_resetPassword;
}

export interface ResetPasswordVariables {
  email: string;
}
