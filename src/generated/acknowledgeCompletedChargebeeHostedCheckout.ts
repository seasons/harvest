/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Plan } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: acknowledgeCompletedChargebeeHostedCheckout
// ====================================================

export interface acknowledgeCompletedChargebeeHostedCheckout_acknowledgeCompletedChargebeeHostedCheckout_billingInfo {
  __typename: "BillingInfo";
  city: string | null;
  expiration_month: number;
  expiration_year: number;
  last_digits: string;
  name: string | null;
  postal_code: string | null;
  state: string | null;
  street1: string | null;
  street2: string | null;
}

export interface acknowledgeCompletedChargebeeHostedCheckout_acknowledgeCompletedChargebeeHostedCheckout {
  __typename: "BillingInfoPayload";
  billingInfo: acknowledgeCompletedChargebeeHostedCheckout_acknowledgeCompletedChargebeeHostedCheckout_billingInfo | null;
  plan: Plan | null;
}

export interface acknowledgeCompletedChargebeeHostedCheckout {
  acknowledgeCompletedChargebeeHostedCheckout: acknowledgeCompletedChargebeeHostedCheckout_acknowledgeCompletedChargebeeHostedCheckout | null;
}

export interface acknowledgeCompletedChargebeeHostedCheckoutVariables {
  hostedPageID: string;
}
