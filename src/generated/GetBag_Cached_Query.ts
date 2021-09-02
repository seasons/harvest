/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBag_Cached_Query
// ====================================================

export interface GetBag_Cached_Query_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  itemCount: number | null;
}

export interface GetBag_Cached_Query {
  __typename: "Query";
  paymentPlans: (GetBag_Cached_Query_paymentPlans | null)[] | null;
}
