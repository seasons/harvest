/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanTier } from "./globalTypes";

// ====================================================
// GraphQL fragment: BagTabHeaderFragment_Query
// ====================================================

export interface BagTabHeaderFragment_Query_me_activeReservation {
  __typename: "Reservation";
  id: string;
  createdAt: any;
  returnAt: any | null;
}

export interface BagTabHeaderFragment_Query_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  tier: PaymentPlanTier | null;
}

export interface BagTabHeaderFragment_Query_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: BagTabHeaderFragment_Query_me_customer_membership_plan | null;
}

export interface BagTabHeaderFragment_Query_me_customer {
  __typename: "Customer";
  id: string;
  membership: BagTabHeaderFragment_Query_me_customer_membership | null;
}

export interface BagTabHeaderFragment_Query_me {
  __typename: "Me";
  id: string | null;
  nextFreeSwapDate: any | null;
  activeReservation: BagTabHeaderFragment_Query_me_activeReservation | null;
  customer: BagTabHeaderFragment_Query_me_customer | null;
}

export interface BagTabHeaderFragment_Query {
  __typename: "Query";
  me: BagTabHeaderFragment_Query_me | null;
}
