/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanTier } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBag_Cached_Query
// ====================================================

export interface GetBag_Cached_Query_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  planID: string;
  tier: PaymentPlanTier | null;
  price: number | null;
  itemCount: number | null;
}

export interface GetBag_Cached_Query {
  paymentPlans: (GetBag_Cached_Query_paymentPlans | null)[] | null;
}
