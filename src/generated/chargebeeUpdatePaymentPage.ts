/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chargebeeUpdatePaymentPage
// ====================================================

export interface chargebeeUpdatePaymentPage_chargebeeUpdatePaymentPage {
  __typename: "ChargebeeCheckout";
  created_at: number;
  embed: boolean;
  expires_at: number;
  id: string;
  object: string;
  resource_version: number;
  state: string;
  type: string;
  updated_at: number;
  url: string;
}

export interface chargebeeUpdatePaymentPage {
  chargebeeUpdatePaymentPage: chargebeeUpdatePaymentPage_chargebeeUpdatePaymentPage | null;
}

export interface chargebeeUpdatePaymentPageVariables {
  planID: string;
}
