/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: checkPaymentProcessed
// ====================================================

export interface checkPaymentProcessed_me_customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
}

export interface checkPaymentProcessed_me_customer {
  __typename: "Customer";
  id: string;
  billingInfo: checkPaymentProcessed_me_customer_billingInfo | null;
}

export interface checkPaymentProcessed_me {
  __typename: "Me";
  customer: checkPaymentProcessed_me_customer | null;
}

export interface checkPaymentProcessed {
  me: checkPaymentProcessed_me | null;
}
