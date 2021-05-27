/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: Product_NoCache_Query
// ====================================================

export interface Product_NoCache_Query_me_customer_user {
  __typename: "User";
  id: string;
}

export interface Product_NoCache_Query_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  itemCount: number | null;
}

export interface Product_NoCache_Query_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: Product_NoCache_Query_me_customer_membership_plan | null;
}

export interface Product_NoCache_Query_me_customer {
  __typename: "Customer";
  id: string;
  status: CustomerStatus | null;
  user: Product_NoCache_Query_me_customer_user;
  membership: Product_NoCache_Query_me_customer_membership | null;
}

export interface Product_NoCache_Query_me_bag {
  __typename: "BagItem";
  id: string;
}

export interface Product_NoCache_Query_me_savedItems {
  __typename: "BagItem";
  id: string;
}

export interface Product_NoCache_Query_me {
  __typename: "Me";
  id: string | null;
  customer: Product_NoCache_Query_me_customer | null;
  bag: Product_NoCache_Query_me_bag[] | null;
  savedItems: Product_NoCache_Query_me_savedItems[] | null;
}

export interface Product_NoCache_Query {
  me: Product_NoCache_Query_me | null;
}
