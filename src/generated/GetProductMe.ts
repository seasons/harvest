/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductMe
// ====================================================

export interface GetProductMe_me_customer_user {
  __typename: "User";
  id: string;
}

export interface GetProductMe_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  itemCount: number | null;
}

export interface GetProductMe_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: GetProductMe_me_customer_membership_plan | null;
}

export interface GetProductMe_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  user: GetProductMe_me_customer_user;
  membership: GetProductMe_me_customer_membership | null;
}

export interface GetProductMe_me_bag {
  __typename: "BagItem";
  id: string;
}

export interface GetProductMe_me_savedItems {
  __typename: "BagItem";
  id: string;
}

export interface GetProductMe_me {
  __typename: "Me";
  id: string | null;
  customer: GetProductMe_me_customer | null;
  bag: GetProductMe_me_bag[] | null;
  savedItems: GetProductMe_me_savedItems[] | null;
}

export interface GetProductMe {
  me: GetProductMe_me | null;
}
