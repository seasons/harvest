/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMembershipInfo
// ====================================================

export interface GetMembershipInfo_me_customer {
  __typename: "Customer";
  plan: Plan | null;
}

export interface GetMembershipInfo_me_user {
  __typename: "User";
  firstName: string;
  lastName: string;
}

export interface GetMembershipInfo_me {
  __typename: "Me";
  customer: GetMembershipInfo_me_customer;
  user: GetMembershipInfo_me_user;
}

export interface GetMembershipInfo {
  me: GetMembershipInfo_me | null;
}
