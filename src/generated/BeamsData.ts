/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BeamsData
// ====================================================

export interface BeamsData_me_user {
  __typename: "User";
  email: string;
  beamsToken: string;
}

export interface BeamsData_me {
  __typename: "Me";
  user: BeamsData_me_user | null;
}

export interface BeamsData {
  me: BeamsData_me | null;
}
