/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlans
// ====================================================

export interface GetPlans_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  name: string | null;
  description: string | null;
  tagline: string | null;
  price: number | null;
}

export interface GetPlans {
  paymentPlans: (GetPlans_paymentPlans | null)[] | null;
}
