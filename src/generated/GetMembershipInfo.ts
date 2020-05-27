/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan, CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetMembershipInfo
// ====================================================

export interface GetMembershipInfo_me_customer_invoices {
  __typename: "Invoice";
  id: string;
  subscriptionId: string | null;
  dueDate: any | null;
}

export interface GetMembershipInfo_me_customer_membership_pauseRequests {
  __typename: "PauseRequest";
  id: string;
  resumeDate: any | null;
  pauseDate: any | null;
  pausePending: boolean;
}

export interface GetMembershipInfo_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  pauseRequests: GetMembershipInfo_me_customer_membership_pauseRequests[] | null;
}

export interface GetMembershipInfo_me_customer {
  __typename: "Customer";
  id: string;
  plan: Plan | null;
  status: CustomerStatus | null;
  invoices: (GetMembershipInfo_me_customer_invoices | null)[] | null;
  membership: GetMembershipInfo_me_customer_membership | null;
}

export interface GetMembershipInfo_me_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetMembershipInfo_me {
  __typename: "Me";
  customer: GetMembershipInfo_me_customer | null;
  user: GetMembershipInfo_me_user | null;
}

export interface GetMembershipInfo {
  me: GetMembershipInfo_me | null;
}
