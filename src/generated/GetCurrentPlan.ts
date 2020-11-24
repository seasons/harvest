/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentPlan
// ====================================================

export interface GetCurrentPlan_me_customer_user {
  __typename: "User";
  id: string;
}

export interface GetCurrentPlan_me_customer_paymentPlan {
  __typename: "PaymentPlan";
  id: string;
  planID: string;
  price: number | null;
  name: string | null;
}

export interface GetCurrentPlan_me_customer {
  __typename: "Customer";
  id: string;
  user: GetCurrentPlan_me_customer_user;
  paymentPlan: GetCurrentPlan_me_customer_paymentPlan | null;
}

export interface GetCurrentPlan_me {
  __typename: "Me";
  customer: GetCurrentPlan_me_customer | null;
}

export interface GetCurrentPlan {
  me: GetCurrentPlan_me | null;
}
