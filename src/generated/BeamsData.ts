/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: BeamsData
// ====================================================

export interface BeamsData_me_user {
  __typename: "User";
  email: string;
  beamsToken: string;
  roles: UserRole[];
}

export interface BeamsData_me {
  __typename: "Me";
  id: string | null;
  user: BeamsData_me_user | null;
}

export interface BeamsData {
  me: BeamsData_me | null;
}
