/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BagTabCachedFragment_Query
// ====================================================

export interface BagTabCachedFragment_Query_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  itemCount: number | null;
}

export interface BagTabCachedFragment_Query {
  __typename: "Query";
  paymentPlans: (BagTabCachedFragment_Query_paymentPlans | null)[] | null;
}
